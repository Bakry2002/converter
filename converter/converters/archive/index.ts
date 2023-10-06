// TOOL => 7z-Zip

import { Converter } from '../../types'
import { mimeToFileExtension } from '../../../lib/file'
import { exec as execAsync } from 'child_process'
import { randomUUID } from 'crypto'
import { mkdir, readFile, readdir, writeFile } from 'fs/promises'
import path, { join } from 'path'
import { promisify } from 'util'
import { ensureDir, remove } from 'fs-extra' // Import the fs-extra library for file operations
import { nodes } from './nodes'
const exec = promisify(execAsync) // promisify exec which mean we can use await on it

const zPath = '"C:\\Program Files\\7-Zip\\7z.exe"' // path to 7z.exe
// ================================================================

const _converters: Array<Converter> = []

export class ArchiveConverter extends Converter {
    // getter for the converter
    get from(): string {
        return this.fromNode.mime
    }
    get to(): string {
        return this.toNode.mime
    }

    public cwd: string = '' // the current working directory
    public inputs: string[] = [] // the input files
    public outputBuffers: Buffer[] = [] // the output buffers

    public input(): string {
        return this.inputs.join(' ') // join the input files with a space, meaning that if we have 2 files, it will be "file1 file2"
    }

    public inputOptions(): string {
        return `${this.fromNode.options?.inputs ?? ''} -i` // return the input options if exists, otherwise return an empty string
    }

    public output(): string {
        return `output.${mimeToFileExtension(this.to)}` // return the output file name in the format of "output.extension"
    }

    public outputOptions(): string {
        return this.toNode.options?.outputs ?? '' // return the output options if exists, otherwise return an empty string
    }
    // the actual conversion function that does the whole conversion process
    async convert(buffers: Buffer[]): Promise<Buffer[]> {
        await this.preWrite(buffers) // pre-write the files, meaning that we will write the input files to the disk
        await this.write(buffers) // write the input files to the disk
        await this.postWrite()
        await this.preConvert()
        await this.execute() // execute the command
        await this.postConvert()
        await this.preRead()
        await this.read() // read the output file
        return this.outputBuffers // return the output buffers
    }

    async preWrite(buffers: Buffer[]) {
        const cwd = join('/tmp', randomUUID()) // generate a random directory name in the /tmp directory
        await mkdir(cwd, { recursive: true }) // create the directory recursively, meaning that if the parent directory doesn't exist, it will create it
        this.cwd = cwd // set the current working directory to the generated directory

        // !FOR DEBUGGING
        console.log('Conversion directory: ', cwd)
        console.log('===============================')

        return buffers
    }

    async write(buffers: Buffer[]) {
        this.inputs = await Promise.all(
            // why Promise.all ? because we want to wait for all the files to be written to the disk before we continue
            buffers.map(async (b) => {
                const name = `${randomUUID()}.${mimeToFileExtension(this.from)}` // generate a random file name with the input file extension
                return writeFile(path.join(this.cwd, name), b).then(() => name) // write the buffer to the file and return the file name
            })
        )
    }

    async postWrite() {}

    async preConvert() {}

    async execute() {
        // Define the input and output file paths
        const fromFile = path.join(this.cwd, this.inputs[0]) // Assuming there is only one input file
        const toFile = path.join(this.cwd, this.output())

        // Create a temporary directory for extracting files
        const extractionFolder = path.join(this.cwd, 'extracted')
        await ensureDir(extractionFolder)

        // Unzip the 'from' file into the extraction folder using 7z
        if (process.env.NODE_ENV === 'production') {
            await exec(`7z x "${fromFile}" -o"${extractionFolder}"`) // extract the file using 7z
            await exec(`7z a "${toFile}" "${extractionFolder}"/*`) // zip the extracted files into a new archive with the 'to' format
        } else {
            await exec(`${zPath} x "${fromFile}" -o"${extractionFolder}"`)
            await exec(`${zPath} a "${toFile}" "${extractionFolder}"/*`)
        }
        // const unzipCommand = `${
        //     process.env.NODE_ENV === 'production' ? '7z' : zPath
        // } x "${fromFile}" -o"${extractionFolder}"`

        // !FOR DEBUGGING
        // console.log('firstCommand: ', unzipCommand)
        console.log('===============================')
        console.log('NODE_ENV: ', process.env.NODE_ENV)

        // await exec(unzipCommand)

        // Zip the extracted files into a new archive with the 'to' format
        // const zipCommand = `${
        //     process.env.NODE_ENV === 'production' ? '7z' : zPath
        // } a "${toFile}" "${extractionFolder}"/*`

        // !FOR DEBUGGING
        // console.log('SecondCommand: ', zipCommand)
        console.log('===============================')

        // await exec(zipCommand)

        // Clean up: Remove the temporary extraction folder
        await remove(extractionFolder)
    }

    async postConvert() {}

    async preRead() {}

    async read() {
        // !FOR DEBUGGING
        console.log('Inputs: ', this.inputs)
        console.log('===============================')

        const outputs = (await readdir(this.cwd)).filter(
            (f) => !this.inputs.includes(f) // filter the output files, meaning that we will only get the output files that are not in the input files
        ) // read the output directory

        // !FOR DEBUGGING
        console.log('Outputs: ', outputs)
        console.log('===============================')

        this.outputBuffers = await Promise.all(
            outputs.map((f) => readFile(`${this.cwd}/${f}`))
        ) // read the output files and store them in the output buffers
    }

    async postRead() {}
}

for (const from of nodes) {
    for (const to of nodes) {
        _converters.push(new ArchiveConverter(from, to)) // push the converter to the converters array
    }
}

export const converters = _converters // export the converters
