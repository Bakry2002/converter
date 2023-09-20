//* ========== Note ==============
// this is the background converter that will be hosted away from the app directory as
// next.js does not support long-running processes
// To make it work asynchronously with the app, we will need to:
//      1. Compile the typescript code to javascript.
//      2. turn it to an executable with docker.
//* ========== End Note ===========

import { Artifact, Stage, Conversion, ConversionStatus } from '@prisma/client'
import { prisma } from '../lib/prisma'
import { findPath } from './graph'
import { s3, key } from '../lib/s3'
const bucket = process.env.AWS_S3_BUCKET_NAME!

type ConversionWithStagesWithArtifacts = Conversion & {
    stages: (Stage & {
        artifacts: Artifact[]
    })[]
}

//TODO: limit the number of retries why? because we don't want to wait forever
// Define the checkObjectExistence function
async function checkObjectExistence(key: any, retryInterval = 1000) {
    while (true) {
        try {
            await s3.headObject({ Bucket: bucket, Key: key })
            console.log('Object exists in s3 bucket')
            return true
        } catch (error) {
            console.error(
                `file is still being uploaded to s3, retrying in ${retryInterval}ms.`
            )
        }
        // for (let retry = 0; retry < maxRetries; retry++) {}

        // Wait for a while before retrying
        await new Promise((resolve) => setTimeout(resolve, retryInterval))
    }
}

// Convert function: all the work will be done here
const convert = async (c: ConversionWithStagesWithArtifacts) => {
    console.log(`Starting conversion: ${c.id}`)
    try {
        const downloadParams = {
            Bucket: bucket,
            Key: key(c, 0, c.stages[0].artifacts[0]), // get the key of the first artifact of the first stage
        }

        const [current, next] = c.stages // get the current stage and the next stage, take the first and the second stages
        console.log('Type: ', c.stages[0].mime)

        // !FOR DEBUGGING
        console.log(`Generated key: ${downloadParams.Key}`)

        // Check if the object exists in s3 using the retry mechanism
        const objectExists = await checkObjectExistence(downloadParams.Key)
        if (!objectExists) {
            // Handle the error or return as needed
            // For example, set the conversion status to ERROR and return
            await prisma.conversion.update({
                where: {
                    id: c.id,
                },
                data: {
                    error: `Object with key ${downloadParams.Key} does not exist`,
                    status: ConversionStatus.ERROR,
                },
            })
            return
        }

        // get the file from s3 to convert it
        const res = await s3.getObject(downloadParams)

        // !FOR DEBUGGING

        console.log(`Starting conversion: ${current.mime} => ${next.mime}`)

        const converters = findPath(current.mime, next.mime) // find the path of converters from the current mime to the next mime

        // if we don't have a path of converters, we will throw an error
        if (!converters) {
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

        const converted = await res.Body?.transformToByteArray() // convert the file to a byte array to be able to convert it

        // if there is no converted file, we will throw an error
        if (!converted) {
            throw new Error(
                'Download file error: Could not convert file to byte array'
            )
        }

        let output: Buffer[] = []
        for (const edge of converters) {
            // !FOR DEBUGGING
            console.log(`Converting to: ${edge.to.mime}`)

            output = await edge.converter.convert([Buffer.from(converted)]) // convert the file using the converter function
        }

        // for loop to go through every file in the output array if it contains more than one file
        for (let i = 0; i < output.length; i++) {
            const buffer = output[i] // get the file from the output array
            // after the files is converted, we will create a new artifacts in the next stage
            const artifact = await prisma.artifact.create({
                data: {
                    order: i,
                    stageId: next.id, // set the stage id to the next stage id
                },
            })

            // !FOR DEBUGGING
            console.log('files Saved:', artifact.id)

            const uploadParams = {
                Bucket: bucket,
                Key: key(c, 1, artifact), // set the key to the second stage
                Body: buffer,
            }
            await s3.putObject(uploadParams) // upload the file to s3 after converting it
        }
        //! RECAP: we have downloaded the file from s3, converted it, and uploaded it back to s3, and then update the database

        // update the conversion status to DONE
        await prisma.conversion.update({
            where: {
                id: c.id,
            },
            data: {
                status: ConversionStatus.DONE,
            },
        })
    } catch (error: any) {
        await prisma.conversion.update({
            where: {
                id: c.id,
            },
            data: {
                status: ConversionStatus.ERROR,
                error: `Could not convert: ${error?.message}`,
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
                    artifacts: true,
                },
            },
        },
    })

    // !FOR DEBUGGING
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
