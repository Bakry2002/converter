//* ========== Note ==============
// this is the background converter that will be hosted away from the app directory as
// next.js does not support long-running processes
// To make it work asynchronously with the app, we will need to:
//      1. Compile the typescript code to javascript.
//      2. turn it to an executable with docker.
//* ========== End Note ===========

import { Artifact, Conversion, ConversionStatus, Stage } from '@prisma/client'
import { prisma } from '../app/lib/prisma'
import { findPath } from './graph'
import { key, s3 } from '../lib/s3'

const bucket = process.env.AWS_S3_BUCKET_NAME!

type ConversionWithStagesWithArtifacts = Conversion & {
    stages: (Stage & {
        artifacts: Artifact[]
    })[]
}

// Convert function: all the work will be done here
const convert = async (c: ConversionWithStagesWithArtifacts) => {
    console.log('Starting conversion', c.id)
    try {
        const downloadParams = {
            Bucket: bucket,
            Key: key(c, 0, c.stages[0].artifacts[0]),
        }

        const [current, next] = c.stages // get the current stage and the next stage, take the first and the second stages
        // !FOR DEBUGGING
        console.log(`Downloading file: ${downloadParams.Key}`)

        const res = await s3.getObject(downloadParams) // download the file from s3

        // !FOR DEBUGGING
        console.log(`Starting conversion: ${current.mime} => ${next.mime}`)

        const converters = findPath(current.mime, next.mime) // find the path of converters from the current mime to the next mime

        if (!converters) {
            // !FOR DEBUGGING
            console.error(
                `Could not find a converters for ${current.mime} to ${next.mime}`
            )
            await prisma.conversion.update({
                where: {
                    id: c.id,
                },
                data: {
                    error: `Could not find a converters for ${current.mime} to ${next.mime}`,
                    status: ConversionStatus.ERROR,
                },
            })
            return
        }

        // otherwise, we will have a path of converters and we need to loop over them
        // convert the body to a buffer (it is a buffer already but we need to make typescript happy
        const converted = await res.Body?.transformToByteArray()
        if (!converted) {
            throw new Error('Could not download the file')
        }

        let output: Buffer[] = [] // create an array of output
        for (const edge of converters) {
            console.log(`Converting to: ${edge.to.type}`)
            output = await edge.converter([Buffer.from(converted)]) // convert the file
        }

        // after the file is converted, we will create a new artifact in the next stage
        const artifact = await prisma.artifact.create({
            data: {
                order: 0,
                stageId: next.id, // set the stage id to the next stage id
            },
        })

        // !FOR DEBUGGING
        console.log('Uploading to:', artifact.id)

        const uploadParams = {
            Bucket: bucket,
            Key: key(c, 1, artifact),
            Body: output[0],
        }
        await s3.putObject(uploadParams) // upload the file to s3

        await prisma.conversion.update({
            where: {
                id: c.id,
            },
            data: {
                status: ConversionStatus.DONE,
            },
        })
        //! RECAP: we have downloaded the file from s3, converted it, and uploaded it back to s3, and then update the database
    } catch (error: any) {
        await prisma.conversion.update({
            where: {
                id: c.id,
            },
            data: {
                status: ConversionStatus.ERROR,
                error: `Could not convert: ${error.message}`,
            },
        })
    }
}

const main = async () => {
    // pull in the conversion from the database that need to be converted
    const conversions = await prisma.conversion.findMany({
        where: {
            status: ConversionStatus.PENDING,
        },
        include: {
            stages: {
                include: {
                    artifacts: true, // include the artifacts to get the id of the artifact
                },
            },
        },
    })

    console.log(`Found ${conversions.length} conversions`)
    // map over the conversions
    for (const conversion of conversions) {
        await convert(conversion)
    }
}

// we will create a function that check for new conversion every second
const loop = async () => {
    while (true) {
        await main()
        await new Promise((resolve) => setTimeout(resolve, 1000))
    }
}

loop()
