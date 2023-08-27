import { Converter } from './def'
import { exec as execAsync } from 'child_process'
import { promisify } from 'util'
import { randomUUID } from 'crypto'
import { readFile, writeFile } from 'fs/promises'
const exec = promisify(execAsync) // promisify exec which mean we can use await on it

export const PNG_TO_JPG: Converter = async (buf) => {
    //! actual converter process
    const file = randomUUID() // generate a random file name
    await writeFile(`/tmp/${file}.png`, buf) // write the buffer to the file
    await exec(`magick /tmp/${file}.png /tmp/${file}.jpg`) // convert the file
    return readFile(`/tmp/${file}.jpg`) // return the converted file
}
PNG_TO_JPG.from = 'png'
PNG_TO_JPG.to = 'jpg'
