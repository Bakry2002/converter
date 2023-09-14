import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'
import { Readable } from 'stream'
import { ConversionStatus } from '@prisma/client'
import { extension } from 'mime-types'
import { key, s3 } from '@/lib/s3'
const bucket = process.env.AWS_S3_BUCKET_NAME!

type RouteParams = {
    params: {
        id: string
    }
}

export async function GET(req: NextRequest, { params }: RouteParams) {
    // find the conversion status by id
    const conversion = await prisma.conversion.findUnique({
        where: {
            id: params.id,
        },
        include: {
            stages: {
                include: {
                    artifacts: true,
                },
            },
        },
    })

    // if there is no conversion with that id
    if (!conversion) {
        return NextResponse.json({ status: 'Not found' }, { status: 404 })
    }

    // check if conversion is done
    if (conversion.status !== ConversionStatus.DONE) {
        return NextResponse.json(
            { status: 'Not done Converting yet!' },
            { status: 400 }
        )
    }

    // params we can pass in to the upload function
    const downloadParams = {
        Bucket: bucket,
        Key: key(conversion, 1, conversion.stages[1].artifacts[0]), // get the key of the first artifact of the second stage i.e. the last stage
    }

    // const downloadResponse = await s3.getObject(downloadParams).promise() // get the file from S3 to be able to download it
    const stream = (
        await s3.getObject(downloadParams)
    ).Body?.transformToWebStream() // get the file from S3 to be able to download it, but with the Readable.toWeb() function, we can stream the file to the client instead of downloading it first

    return new NextResponse(stream as any, {
        headers: {
            'Content-Type': conversion.stages[1].mime,
            'Content-Disposition': `attachment; filename=download.${extension(
                conversion.stages[1].mime
            )}`,
        },
    })
}
