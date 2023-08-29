//* ========== Note ==============
//! => main steps of the file
// => comment on each line to understand what is happening
//* ========== End Note ===========

import { ConversionStatus } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/app/lib/prisma'
import { extname } from 'path'
import { v4 as uuid } from 'uuid'
import * as AWS from 'aws-sdk'
import { randomUUID } from 'crypto'

AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_DEFAULT_REGION,
})

const bucket = process.env.AWS_S3_BUCKET_NAME!
export async function POST(req: NextRequest) {
    //! load the file from the request
    const data = await req.formData()
    const file: File | null = data.get('file') as unknown as File
    const from = file.type // get the file type
    const to = data.get('to') as string

    // if there is no file, return an error
    if (!file) {
        return new NextResponse(JSON.stringify({ error: 'No file found!' }), {
            status: 400,
        })
    }

    // if there is no to, return an error
    if (!to) {
        return new NextResponse(
            JSON.stringify({ error: 'No "to" type found!' }),
            {
                status: 400,
            }
        )
    }

    const bytes = await file.arrayBuffer() // Reads the file into memory and returns as ArrayBuffer which is a byte array
    const buffer = Buffer.from(bytes) // Creates a Buffer object from file byte data

    //! upload the file to S3
    const key = `${randomUUID()}${randomUUID()}`.replace(/-/g, '') // create a unique key for the file, and replace all the dashes with nothing

    // create new s3 client
    const s3 = new AWS.S3()

    // params we can pass in to the upload function
    const params = {
        Bucket: bucket,
        Key: key,
        Body: buffer, // which is the file content in bytes
    }

    const uploadResponse = await s3.upload(params).promise() // upload the file to S3 so we can access it later
    console.log(`File uploaded successfully at. ${uploadResponse.Location}`)

    //! save the metadata to the Postgres database
    const conversions = await prisma.conversion.create({
        data: {
            s3Key: key, // uploadResponse.Location,
            fromMime: from,
            toMime: to,
            currentMime: from,
            status: ConversionStatus.PENDING,
        },
    })
    //! return UUID of the file
    return NextResponse.json({ id: conversions.id })
}
