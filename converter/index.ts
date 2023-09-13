//* ========== Note ==============
// this is the background converter that will be hosted away from the app directory as
// next.js does not support long-running processes
// To make it work asynchronously with the app, we will need to:
//      1. Compile the typescript code to javascript.
//      2. turn it to an executable with docker.
//* ========== End Note ===========

import { Conversion, ConversionStatus } from '@prisma/client'
import * as AWS from 'aws-sdk'
import { prisma } from '../app/lib/prisma'
// import { PNG_TO_JPG } from './converters/image'
import { randomUUID } from 'crypto'
import { extension } from 'mime-types'
import { findPath } from './graph'

AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_DEFAULT_REGION,
})
const bucket = process.env.AWS_S3_BUCKET_NAME!

<<<<<<< HEAD
<<<<<<< Updated upstream
//! Convert function: all the work will be done here
const convert = async (c: Conversion) => {
=======
type ConversionWithStagesWithArtifacts = Conversion & {
    stages: (Stage & {
        artifacts: Artifact[]
    })[]
}

// Convert function: all the work will be done here
const convert = async (c: ConversionWithStagesWithArtifacts) => {
    console.log('Starting conversion: ', c.id)
>>>>>>> Stashed changes
=======
//! Convert function: all the work will be done here
const convert = async (c: Conversion) => {
>>>>>>> parent of 685184b (new data model with stages and artifacts)
    try {
        const s3 = new AWS.S3()
        const downloadParams = {
            Bucket: bucket,
            Key: c.s3Key,
        }
        console.log('Downloading file:', downloadParams)
        const res = await s3.getObject(downloadParams).promise()

<<<<<<< HEAD
<<<<<<< Updated upstream
        const converters = findPath(c.fromMime, c.toMime)
=======
        const [current, next] = c.stages // get the current stage and the next stage, take the first and the second stages
        // !FOR DEBUGGING
        console.log(`Downloading file with key: ${downloadParams.Key}`)

        const res = await s3.getObject(downloadParams) // download the file from s3
        console.log('res', res)

        // !FOR DEBUGGING
        console.log(`Starting conversion: ${current.mime} => ${next.mime}`)

        const converters = findPath(current.mime, next.mime) // find the path of converters from the current mime to the next mime
>>>>>>> Stashed changes
=======
        const converters = findPath(c.fromMime, c.toMime)
>>>>>>> parent of 685184b (new data model with stages and artifacts)

        if (!converters) {
            console.error(
                `Could not find a converters for ${c.fromMime} to ${c.toMime}`
            )
            await prisma.conversion.update({
                where: {
                    id: c.id,
                },
                data: {
                    error: `Could not convert from ${c.fromMime} to ${c.toMime}`,
                    status: ConversionStatus.ERROR,
                },
            })
            return
        }

        // otherwise, we will have a path of converters and we need to loop over them
        let converted = res.Body as Buffer // this is the file we will convert
        for (const edge of converters) {
            converted = await edge.converter(res.Body as Buffer) // convert the file
        }

        console.log('Convert', converters[converters.length - 1].to.type)
        const mime = extension(
            converters[converters.length - 1].to.type
        ) as string // get the mime type of the last converter as it will be the required mime type to

        const key = (randomUUID() + randomUUID()).replace(/-/g, '') //  create a new random key for the file after it has been converted
        console.log('Uploading to:', key)
        const uploadParams = {
            Bucket: bucket,
            Key: key,
            Body: converted,
        }
        await s3.putObject(uploadParams).promise()

        await prisma.conversion.update({
            where: {
                id: c.id,
            },
            data: {
                status: ConversionStatus.DONE,
                s3Key: key,
                currentMime: mime,
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
