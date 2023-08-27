//* ========== Note ==============

//* ========== End Note ===========
import * as AWS from 'aws-sdk'
import { prisma } from '@/app/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'
import { Readable } from 'stream'
import { ConversionStatus } from '@prisma/client'
import { contentType, extension } from 'mime-types'

AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_DEFAULT_REGION,
})
const bucket = process.env.AWS_S3_BUCKET_NAME!

type RouteParams = {
    params: {
        id: string
    }
}

export async function GET(req: NextRequest, { params }: RouteParams) {
    //! find the conversion status by id
    const conversions = await prisma.conversion.findUnique({
        where: {
            id: params.id,
        },
    })

    // if there is no conversion with that id
    if (!conversions) {
        return NextResponse.json({ status: 'Not found' }, { status: 404 })
    }

    // check if conversion is done
    if (conversions.status !== ConversionStatus.DONE) {
        return NextResponse.json({ status: 'Not done yet' }, { status: 400 })
    }

    const s3 = new AWS.S3() // create new s3 client

    // params we can pass in to the upload function
    const downloadParams = {
        Bucket: bucket,
        Key: conversions.s3Key,
    }

    // const downloadResponse = await s3.getObject(downloadParams).promise() // get the file from S3 to be able to download it
    const stream = Readable.toWeb(
        s3.getObject(downloadParams).createReadStream()
    ) // get the file from S3 to be able to download it, but with the Readable.toWeb() function, we can stream the file to the client instead of downloading it first
    return new NextResponse(stream as any, {
        headers: {
            'Content-Type': conversions.toMime,
            'Content-Disposition': `attachment; filename=download.${extension(
                conversions.toMime
            )}`,
        },
    })
}
