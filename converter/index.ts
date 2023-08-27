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
import { PNG_TO_JPG } from './converters/image'
import { randomUUID } from 'crypto'

AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_DEFAULT_REGION,
})
const bucket = process.env.AWS_S3_BUCKET_NAME!

//! Convert function: all the work will be done here
const convert = async (c: Conversion) => {
    const s3 = new AWS.S3()
    const downloadParams = {
        Bucket: bucket,
        Key: c.s3Key,
    }
    console.log('Downloading file:', downloadParams)
    const res = await s3.getObject(downloadParams).promise()
    const converted = await PNG_TO_JPG(res.Body as Buffer)
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
            currentMime: 'image/jpg',
        },
    })

    //! RECAP: we have downloaded the file from s3, converted it, and uploaded it back to s3, and then update the database
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
