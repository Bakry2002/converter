'use client'

import { Link } from '@nextui-org/link'
import { Button } from '@nextui-org/react'
import { useEffect, useState } from 'react'
import { ConversionStatus } from '@prisma/client'

type Props = {
    resultId: string
}
export const DownloadButton = ({ resultId }: Props) => {
    const [status, setStatus] = useState<ConversionStatus>(
        ConversionStatus.PENDING
    )

    async function refresh() {
        try {
            const res = await fetch(`/api/status/${resultId}`) // get the status of the conversion with that id
            if (!res.ok) throw new Error(await res.text()) // handle error

            const { status } = await res.json() // get the status from the response
            setStatus(status) // set the status in the state
        } catch (error: any) {
            console.error(error)
        }
    }

    useEffect(() => {
        const tick = setInterval(refresh, 1000) // refresh the status every second
        return () => clearInterval(tick)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <Button
            as={Link}
            color="success"
            isDisabled={status !== ConversionStatus.DONE}
            href={`/api/download/${resultId}`}
            className={
                status === ConversionStatus.DONE
                    ? 'bg-green-700 rounded text-white p-2 animate-pulse'
                    : ''
            }
        >
            Download
        </Button>
    )
}
