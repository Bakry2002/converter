//* ========== Note ==============
//! => main steps of the file
// => comment on each line to understand what is happening
//* ========== End Note ===========

import { ConversionStatus } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { fileExtensionToMime } from '@/lib/file'
import { key, s3 } from '@/lib/s3'
import { lookup } from 'mime-types'
const bucket = process.env.AWS_S3_BUCKET_NAME!

export async function POST(req: NextRequest) {
    // load the file from the request
    const data = await req.formData()
    const file: File | null = data.get('file') as unknown as File
    // get the mime type of the file
    const from = fileExtensionToMime(file.name)
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

    // save the metadata to the Postgres database with the new created stags and artifacts
    const conversion = await prisma.conversion.create({
        data: {
            currentStage: 0,
            status: ConversionStatus.PENDING,
            stages: {
                create: [
                    {
                        mime: from,
                        order: 0,
                        artifacts: {
                            create: [
                                {
                                    order: 0,
                                },
                            ],
                        },
                    },
                    {
                        mime: to,
                        order: 1,
                    },
                ],
            },
        },
        include: {
            stages: {
                include: {
                    artifacts: true,
                },
            },
        },
    })

    // params we can pass in to the upload function
    const params = {
        Bucket: bucket,
        Key: key(conversion, 0, conversion.stages[0].artifacts[0]),
        Body: buffer, // which is the file content in bytes
    }

    await s3.putObject(params) // upload the file to s3

    // !FOR DEBUGGING
    console.log(`File uploaded successfully with id: ${conversion.id}`)

    // return id of the file
    return NextResponse.json({ id: conversion.id })
}
