'use client'

import { UXConversionStatus, useConversion } from '@/context/ConversionContext'
import { AnimatePresence, motion } from 'framer-motion'
import ConversionListItem from './ConversionListItem'
import { z } from 'zod'
import { Button } from '../ui/button'
import { Trash2 } from 'lucide-react'
import { key } from '@/lib/s3'
import { useCallback } from 'react'

// the schema is a zod schema that takes an array of objects that have a property to that is an object that has a property mime that is a string and a property ext that is a string
const schema = z.array(
    z.object({
        to: z.object({
            mime: z.string(),
        }),
    })
)
export const Manager = () => {
    const { conversions, updateConversion, removeConversion, convert } =
        useConversion()

    const validate = () => {
        const result = schema.safeParse(conversions) // safeParse is a function that takes a schema and returns a result
        console.log('result', result)
        if (!result.success) {
            // if the result is not successful and there is  a error in one of the conversions
            // loop over the issues and log them
            for (const issue of result.error.issues) {
                updateConversion(issue.path[0] as number, {
                    error: issue.message,
                }) // update the conversion at the index e.path[0] with the error message
                console.log('Error:', issue)
            }
            return
        }
        // after the validation being successful, we can convert the files
        convert()
    }

    const ClearAllBtnHandler = useCallback(() => {
        const pendingIndexes: number[] = []

        // Find the indexes of all pending conversions
        conversions.forEach((conversion, key) => {
            if (conversion.status === UXConversionStatus.Pending) {
                pendingIndexes.push(key)
            }
        })

        // Remove all pending conversions in reverse order to avoid index shifting
        pendingIndexes.reverse().forEach((index) => {
            removeConversion(index)
        })
    }, [conversions, removeConversion])

    return (
        <div className="container mx-auto">
            {conversions.length > 0 && (
                <div className="flex  justify-between mt-8">
                    <h2 className="text-3xl w-fit font-medium text-neutral-900 bg-[#ededed] rounded-tr-3xl rounded-tl-3xl py-2  px-4">
                        Files to{' '}
                        <span className="font-bold text-primary">Convert</span>
                    </h2>
                    <button
                        className="bg-[#ededed] flex items-center gap-2 justify-center text-xl w-fit font-bold text-primary p-4 rounded-tr-3xl rounded-tl-3xl"
                        onClick={ClearAllBtnHandler}
                    >
                        <Trash2 className="w-6 h-6 text-primary" />
                        Clear All
                    </button>
                </div>
            )}
            <AnimatePresence>
                {conversions.length > 0 && (
                    <motion.div
                        className="shadow-sm"
                        initial={{ opacity: 0, transform: 'translateY(50px)' }}
                        animate={{
                            opacity: 1,
                            transform: 'translateY(0px)',
                            transition: { duration: 0.3 },
                        }}
                        exit={{ opacity: 0, transform: 'translateY(50px)' }}
                    >
                        <ul className="bg-[#ededed] flex flex-col justify-center gap-y-4 rounded-br-3xl rounded-bl-3xl ">
                            {conversions.map((conversion, key) => (
                                <ConversionListItem
                                    key={key}
                                    conversion={conversion}
                                    onRemove={() => removeConversion(key)}
                                    onUpdate={(c) => updateConversion(key, c)}
                                    onConvertTo={(to) => {
                                        updateConversion(key, { to })
                                    }}
                                />
                            ))}
                        </ul>
                        {/* <div className="flex justify-center py-4">
                            <>
                                <Button
                                    color="primary"
                                    className="bg-neutral-900 text-white p-2 rounded-md"
                                    onClick={() => validate()}
                                    disabled={
                                        !conversions.some(
                                            (conversion) =>
                                                conversion.status !==
                                                UXConversionStatus.Completed
                                        )
                                    }
                                >
                                    Convert
                                </Button>
                            </>
                        </div> */}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
