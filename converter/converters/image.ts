import { Converter } from './def'
import { exec as execAsync } from 'child_process'
import { promisify } from 'util'
import { randomUUID } from 'crypto'
import { readFile, writeFile } from 'fs/promises'
import { extension, lookup } from 'mime-types'
const exec = promisify(execAsync) // promisify exec which mean we can use await on it

const formats = ['png', 'jpg', 'gif', 'bmp', 'webp', 'tiff', 'heic', 'heif']

const buildConverter = (from: string, to: string): Converter => {
    const converter: Converter = async (buf) => {
        const file = randomUUID() // generate a random file name
        await writeFile(`/tmp/${file}.${extension(from)}`, buf) // write the buffer to the file
        await exec(
            `magick /tmp/${file}.${extension(from)} /tmp/${file}.${extension(
                to
            )}`
        ) // convert the file
        return readFile(`/tmp/${file}.${extension(to)}`) // return the converted file
    }
    converter.from = from
    converter.to = to
    return converter
}

for (const from of formats) {
    for (const to of formats) {
        const fromMime = lookup(from)
        const toMime = lookup(to)
        if (!fromMime || !toMime) {
            throw new Error(`Could not find mime type for ${from} or ${to}`)
        }
        if (from === to) {
            continue
        }
        exports[`${from.toUpperCase()}_TO_${to.toUpperCase()}`] =
            buildConverter(fromMime, toMime)
        console.log(`${from.toUpperCase()}_TO_${to.toUpperCase()}`)
    }
}
