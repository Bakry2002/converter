import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'
import { Readable } from 'stream'
import { ConversionStatus } from '@prisma/client'
import { extension } from 'mime-types'
import { key, s3 } from '@/lib/s3'
import archiver from 'archiver'
import { mimeToFileExtension } from '@/lib/file'
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

    ////////////////////////////////*
    const last = conversion.stages[conversion.stages.length - 1] // get the last stage
    console.log('Length', last.artifacts.length)
    if (last.artifacts.length > 1) {
        // if there is more than one artifact, archive them into a zip file
        const archive = archiver('zip', {
            zlib: { level: 9 }, // Sets the compression level. means that the compression will be the highest
        })

        for (const artifact of last.artifacts) {
            const downloadParams = {
                Bucket: bucket,
                Key: key(conversion, conversion.stages.length - 1, artifact),
            }

            const stream = await (
                await s3.getObject(downloadParams)
            ).Body?.transformToByteArray() // get the file from S3 to be able to download it, but with the Readable.toWeb() function, we can stream the file to the client instead of downloading it first

            if (!stream) {
                throw new Error('Could not get Stream')
            }

            const buffer = Buffer.from(stream) // convert the stream to a buffer
            archive.append(buffer, {
                name: `${artifact.id}.${mimeToFileExtension(last.mime)}`,
            }) // append the file to the archive with the name of the artifact id and the file extension
        }

        archive.finalize() // finalize the archive

        return new NextResponse(archive as any, {
            headers: {
                'Content-Type': 'application/zip',
                'Content-Disposition': `attachment; filename=download.zip`,
            },
        })
    }

    ////////////////////////////////*

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
