import { Artifact, Conversion } from '@prisma/client'
import { S3 } from '@aws-sdk/client-s3'

export const s3 = new S3({
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
    region: process.env.AWS_DEFAULT_REGION,
})

// Key function: this function will generate a key for the file in s3
export const key = (c: Conversion, n: number, a: Artifact) =>
    `${c.id}/${n}/${a.id}`
