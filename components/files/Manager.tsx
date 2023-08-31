'use client'

import { useConversion } from '@/context/ConversionContext'
import { AnimatePresence, motion } from 'framer-motion'
import ConversionListItem from './ConversionListItem'
import { Button } from '../ui/button'
import { z } from 'zod'

const schema = z.array(
    z.object({
        to: z.string(),
    })
)
export const Manager = () => {
    const { conversions, updateConversion, removeConversion } = useConversion()

    const validate = () => {
        const result = schema.safeParse(conversions) // safeParse is a function that takes a schema and returns a result
        console.log('result', result)
        if (!result.success) {
            // if the result is not successful and there is  a error in one of the conversions
            // loop over the issues and log them
            for (const issue of result.error.issues) {
                updateConversion(issue.path[0], { error: issue.message }) // update the conversion at the index e.path[0] with the error message
            }
            console.log('Error:', result.error.issues)
        }
    }
    return (
        <AnimatePresence>
            {conversions.length > 0 && (
                <motion.div
                    // there is an action of type  function called convert exported from its own file.ts
                    className="bg-white/80 backdrop-blur-md rounded-lg p-2 m-2"
                    initial={{ opacity: 0, transform: 'translateY(50px)' }}
                    animate={{
                        opacity: 1,
                        transform: 'translateY(0px)',
                        transition: { duration: 0.3 },
                    }}
                    exit={{ opacity: 0, transform: 'translateY(50px)' }}
                >
                    <h2 className="text-lg font-medium text-neutral-900">
                        Files to convert
                    </h2>
                    <ul className="bg-white/80 backdrop-blur-lg">
                        {conversions.map((conversion, key) => (
                            <ConversionListItem
                                key={key}
                                conversion={conversion}
                                onRemove={() => removeConversion(key)}
                                onConvertTo={(to) => {
                                    updateConversion(key, {
                                        to,
                                        error: undefined,
                                    })
                                }}
                            />
                        ))}
                    </ul>
                    <div className="flex justify-center">
                        <Button type="submit" onClick={() => validate()}>
                            Convert
                        </Button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
