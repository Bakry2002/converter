import { Converter } from '../def'
import { exec as execAsync } from 'child_process'
import { promisify } from 'util'
import { randomUUID } from 'crypto'
import { readFile, writeFile } from 'fs/promises'
import { extension, lookup } from 'mime-types'
import { formats } from './formats'
const exec = promisify(execAsync) // promisify exec which mean we can use await on it

// EDIT: change the format to be MIME types instead of file extensions
// old format: const formats = ['png', 'jpg', 'gif', 'bmp', 'webp', 'tiff', 'heic', 'heif', 'ico']
// the new is move the formats in separate file and export it

// EDIT: add  the extra params (i.e. the extra command for some formats like ico, must come with a resize command)
// old:
// const buildConverter = (from: string, to: string): Converter => {
//     const converter: Converter = async (buf) => {
//         const file = randomUUID() // generate a random file name
//         await writeFile(`/tmp/${file}.${extension(from)}`, buf) // write the buffer to the file
//         await exec(
//             `magick /tmp/${file}.${extension(from)} /tmp/${file}.${extension(
//                 to
//             )}`
//         ) // convert the file
//         return readFile(`/tmp/${file}.${extension(to)}`) // return the converted file
//     }
//     converter.from = from
//     converter.to = to
//     return converter
// }

const buildConverter = (
    from: string,
    to: string,
    params?: string
): Converter => {
    const converter: Converter = async (buf) => {
        const file = randomUUID() // generate a random file name
        await writeFile(`/tmp/${file}.${extension(from)}`, buf) // write the buffer to the file
        await exec(
            `${
                process.env.NODE_ENV === 'production' ? 'convert' : 'magick'
            } /tmp/${file}.${extension(from)} ${
                params ?? ''
            } /tmp/${file}.${extension(to)}`
        ) // convert the file
        return readFile(`/tmp/${file}.${extension(to)}`) // return the converted file
    }
    converter.from = from
    converter.to = to
    return converter
}

// EDIT: change the converter to use MIME types instead of file extensions
const _converters: Array<Converter> = []

for (const from of formats) {
    for (const to of formats) {
        if (from.mime === to.mime) {
            // if it the same format, skip
            continue
        }
        _converters.push(buildConverter(from.mime, to.mime, to.params)) // build the converter
    }
}

export const converters = _converters // export the converters
