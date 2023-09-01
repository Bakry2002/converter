'use client'

import { Link } from '@nextui-org/link'
import { Button } from '@nextui-org/react'
import { useEffect, useState } from 'react'
import { ConversionStatus } from '@prisma/client'

type Props = {
    id: string
}
export const DownloadButton = ({ id }: Props) => {
    return (
        <Button
            as={Link}
            color="success"
            href={`/api/download/${id}`}
            className={'bg-green-700 rounded text-white p-2 animate-pulse'}
        >
            Download
        </Button>
    )
}
