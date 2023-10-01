// TOOL => pandoc

import { Converter, MimeNode } from '../../types'
import { mimeToFileExtension } from '../../../lib/file'
import { exec as execAsync } from 'child_process'
import { randomUUID } from 'crypto'
import { mkdir, readFile, readdir, writeFile } from 'fs/promises'
import { join } from 'path'
import { promisify } from 'util'
import { nodes } from './nodes'
const exec = promisify(execAsync) // promisify exec which mean we can use await on it

// ============ Paths for the tool used in the conversion ============
const pandocPath = 'C:\\Users\\lenovo\\AppData\\Local\\Pandoc\\pandoc.exe'
const pdf2docxPath =
    'C:\\Users\\lenovo\\AppData\\Local\\Programs\\Python\\Python311\\Scripts\\pdf2docx.exe'
const gttsPath =
    'C:\\Users\\lenovo\\AppData\\Local\\Programs\\Python\\Python311\\Scripts\\gtts-cli.exe'
const pdfToTxtPath =
    'C:\\Users\\lenovo\\AppData\\Local\\Programs\\MiKTeX\\miktex\\bin\\x64\\pdftotext.exe'
// ====================================================================

const _converters: Array<Converter> = []
export class DocsConverter extends Converter {
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
        return `` // return the input options if exists, otherwise return an empty string
    }

    public output(): string {
        return `output.${mimeToFileExtension(this.to)}` // return the output file name in the format of "output.extension"
    }

    public outputOptions(): string {
        return `${this.toNode.options?.outputs ?? ''} -s -o` // return the output options if exists, otherwise return an empty string
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
                return writeFile(join(this.cwd, name), b).then(() => name) // write the buffer to the file and return the file name
            })
        )
    }

    async postWrite() {}

    async preConvert() {}
    async execute() {
        console.log(
            `${
                process.env.NODE_ENV === 'development' ? pandocPath : 'pandoc'
            } ${this.inputOptions()} ${this.input()} ${this.outputOptions()} ${this.output()}`
        )
        console.log('===============================')

        await exec(
            `${
                process.env.NODE_ENV === 'development' ? pandocPath : 'pandoc'
            } ${this.inputOptions()} ${this.input()} ${this.outputOptions()} ${this.output()}`,
            { cwd: this.cwd }
        )
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

//
// TOOL => pdf2docx

export class Pdf2DocxConverter extends Converter {
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
        return ``
    }

    public output(): string {
        return `output.${mimeToFileExtension(this.to)}`
    }

    public outputOptions(): string {
        return this.toNode.options?.outputs ?? ''
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
                return writeFile(join(this.cwd, name), b).then(() => name) // write the buffer to the file and return the file name
            })
        )
    }

    async postWrite() {}

    async preConvert() {}

    async execute() {
        console.log(
            `${
                process.env.NODE_ENV === 'development'
                    ? pdf2docxPath
                    : 'pdf2docx'
            } convert ${this.inputOptions()} ${this.input()} ${this.outputOptions()} ${this.output()}`
        )
        console.log('===============================')

        await exec(
            `${
                process.env.NODE_ENV === 'development'
                    ? pdf2docxPath
                    : 'pdf2docx'
            } convert ${this.inputOptions()} ${this.input()} ${this.outputOptions()} ${this.output()}`,
            { cwd: this.cwd }
        )
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
//

// subclass from the DocsConverter that convert plain text to an audio file using the text to speech tool gtts

export class TxtToAudioConverter extends DocsConverter {
    override get from() {
        return 'text/plain' // override the from property from the parent class to be "text/plain"
    }

    constructor(to: MimeNode) {
        super({ mime: 'text/plain' }, to) // call the parent constructor
    }

    override output() {
        return `output.${mimeToFileExtension(this.to)}` // return the output file name in the format of "output.extension"
    }

    override inputOptions(): string {
        return `${this.fromNode.options?.inputs ?? ''} -l en -f`
    }

    override outputOptions() {
        return `${this.toNode.options?.outputs ?? ''} -o` // return the output options if exists, otherwise return an empty string
    }

    override execute: () => Promise<void> = async () => {
        console.log(
            `${
                process.env.NODE_ENV === 'development' ? gttsPath : 'gtts-cli'
            } ${this.inputOptions()} ${this.input()} ${this.outputOptions()} ${this.output()}`
        )

        await exec(
            `${
                process.env.NODE_ENV === 'development' ? gttsPath : 'gtts-cli'
            } ${this.inputOptions()} ${this.input()} ${this.outputOptions()} ${this.output()}`,
            { cwd: this.cwd }
        )
    }
}

// PDF to plain text converter
export class PdfToTxtConverter extends DocsConverter {
    override get from() {
        return 'application/pdf'
    }

    constructor(to: MimeNode) {
        super({ mime: 'application/pdf' }, to) // call the parent constructor
    }

    override output() {
        return `output.${mimeToFileExtension(this.to)}` // return the output file name in the format of "output.extension"
    }

    override inputOptions(): string {
        return ''
    }

    override outputOptions() {
        return ''
    }

    override execute: () => Promise<void> = async () => {
        console.log(
            `${
                process.env.NODE_ENV === 'development'
                    ? pdfToTxtPath
                    : 'pdftotext'
            } ${this.inputOptions()} ${this.input()} ${this.outputOptions()} ${this.output()}`
        )

        await exec(
            `${
                process.env.NODE_ENV === 'development'
                    ? pdfToTxtPath
                    : 'pdftotext'
            } ${this.inputOptions()} ${this.input()} ${this.outputOptions()} ${this.output()}`,
            { cwd: this.cwd }
        )
    }
}

// add the PdfToTxtConverter to the converters array
for (const to of nodes) {
    // ignore anything that is not text
    if (!to.mime.startsWith('text')) continue
    _converters.push(new PdfToTxtConverter(to))
}

// add the TxtToAudioConverter to the converters array
for (const to of nodes) {
    // ignore anything that is not audio
    if (!to.mime.startsWith('audio')) continue
    _converters.push(new TxtToAudioConverter(to))
}

// add the DocsConverter to the converters array
for (const from of nodes) {
    for (const to of nodes) {
        if (from.mime === 'application/pdf' || to.mime === 'text/plain')
            continue
        _converters.push(new DocsConverter(from, to)) // push the converter to the converters array
    }
}
_converters.push(new Pdf2DocxConverter(nodes[2], nodes[3])) // push the converter to the converters array between the 3rd and 4th nodes which is pdf to docx

export const converters = _converters // export the converters
