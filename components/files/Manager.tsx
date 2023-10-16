'use client'

import { UXConversionStatus, useConversion } from '@/context/ConversionContext'
import { AnimatePresence, motion } from 'framer-motion'
import ConversionListItem from './ConversionListItem'
import { z } from 'zod'
import { Button } from '../ui/button'

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
    return (
        <AnimatePresence>
            {conversions.length > 0 && (
                <motion.div
                    // there is an action of type  function called convert exported from its own file.ts
                    className="bg-white/80 backdrop-blur-md rounded-lg m-2 container mx-auto"
                    initial={{ opacity: 0, transform: 'translateY(50px)' }}
                    animate={{
                        opacity: 1,
                        transform: 'translateY(0px)',
                        transition: { duration: 0.3 },
                    }}
                    exit={{ opacity: 0, transform: 'translateY(50px)' }}
                >
                    <h2 className="mb-8 text-lg font-medium text-neutral-900">
                        Files to convert
                    </h2>
                    <ul className="bg-white/80 backdrop-blur-lg flex flex-col justify-center gap-y-4">
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
                    <div className="flex justify-center py-4">
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
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
