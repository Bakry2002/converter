//* ========== Note ==============
// this api will be used to check the status of the conversion
// so that the user can see if the conversion is done or not and also can walk through the whole process of the conversion
// from pending to processing to Done
//* ========== End Note ===========

import { prisma } from '@/app/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

type RouteParams = {
    params: {
        id: string
    }
}

export async function GET(req: NextRequest, { params }: RouteParams) {
    // find the conversion status by id
    const conversions = await prisma.conversion.findUnique({
        where: {
            id: params.id,
        },
    })

    // if there is no conversion with that id
    if (!conversions) {
        return NextResponse.json({ status: 'Not found' }, { status: 404 })
    }

    return NextResponse
}
