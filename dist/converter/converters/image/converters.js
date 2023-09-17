"use strict";
//* Edit happened in this file
// EDIT: change the format to be MIME types instead of file extensions
// EDIT: add  the extra params (i.e. the extra command for some formats like ico, must come with a resize command)
// EDIT: change the converter to use MIME types instead of file extensions
//* ====================================
Object.defineProperty(exports, "__esModule", { value: true });
exports.converters = exports.PdfToConverter = exports.ImageConverter = void 0;
// ========== 00:30:00 ==========
// import { Converter } from '../def'
const child_process_1 = require("child_process");
const util_1 = require("util");
const crypto_1 = require("crypto");
const promises_1 = require("fs/promises");
const mime_types_1 = require("mime-types");
// import { formats } from './formats'
const types_1 = require("../../types");
const file_1 = require("../../../lib/file");
const path_1 = require("path");
const nodes_1 = require("./nodes");
const exec = (0, util_1.promisify)(child_process_1.exec); // promisify exec which mean we can use await on it
// NEW CODE: Class component
const _converters = [];
// ==========================================================================================
// ==========================================================================================
// ==========================================================================================
class ImageConverter extends types_1.Converter {
    constructor() {
        super(...arguments);
        this.cwd = ''; // the current working directory
        this.inputs = []; // the input files
        this.outputBuffers = []; // the output buffers
    }
    // getter for the converter
    get from() {
        return this.fromNode.mime;
    }
    get to() {
        return this.toNode.mime;
    }
    input() {
        return this.inputs.join(' '); // join the input files with a space, meaning that if we have 2 files, it will be "file1 file2"
    }
    inputOptions() {
        var _a, _b;
        return (_b = (_a = this.fromNode.options) === null || _a === void 0 ? void 0 : _a.inputs) !== null && _b !== void 0 ? _b : ''; // return the input options if exists, otherwise return an empty string
    }
    output() {
        return `output.${(0, file_1.mimeToFileExtension)(this.to)}`; // return the output file name in the format of "output.extension"
    }
    outputOptions() {
        var _a, _b;
        return (_b = (_a = this.toNode.options) === null || _a === void 0 ? void 0 : _a.outputs) !== null && _b !== void 0 ? _b : ''; // return the output options if exists, otherwise return an empty string
    }
    // the actual conversion function that does the whole conversion process
    async convert(buffers) {
        await this.preWrite(buffers); // pre-write the files, meaning that we will write the input files to the disk
        await this.write(buffers); // write the input files to the disk
        await this.postWrite();
        await this.preConvert();
        await this.execute(); // execute the command
        await this.postConvert();
        await this.preRead();
        await this.read(); // read the output file
        return this.outputBuffers; // return the output buffers
    }
    async preWrite(buffers) {
        const cwd = (0, path_1.join)('/tmp', (0, crypto_1.randomUUID)()); // generate a random directory name in the /tmp directory
        await (0, promises_1.mkdir)(cwd, { recursive: true }); // create the directory recursively, meaning that if the parent directory doesn't exist, it will create it
        this.cwd = cwd; // set the current working directory to the generated directory
        // !FOR DEBUGGING
        console.log('Conversion directory: ', cwd);
        return buffers;
    }
    async write(buffers) {
        this.inputs = await Promise.all(
        // why Promise.all ? because we want to wait for all the files to be written to the disk before we continue
        buffers.map(async (b) => {
            const name = `${(0, crypto_1.randomUUID)()}.${(0, mime_types_1.extension)(this.from)}`; // generate a random file name with the input file extension
            return (0, promises_1.writeFile)((0, path_1.join)(this.cwd, name), b).then(() => name); // write the buffer to the file and return the file name
        }));
    }
    async postWrite() { }
    async preConvert() { }
    async execute() {
        console.log(`${process.env.NODE_ENV === 'development' ? 'magick' : 'convert'}`);
        await exec(`${process.env.NODE_ENV === 'development' ? 'magick' : 'convert'}${this.inputOptions()} ${this.input()} ${this.outputOptions()} ${this.output()}`, { cwd: this.cwd });
    }
    async postConvert() { }
    async preRead() { }
    async read() {
        // !FOR DEBUGGING
        console.log('Inputs: ', this.inputs);
        const outputs = (await (0, promises_1.readdir)(this.cwd)).filter((f) => !this.inputs.includes(f) // filter the output files, meaning that we will only get the output files that are not in the input files
        ); // read the output directory
        // !FOR DEBUGGING
        console.log('Outputs: ', outputs);
        this.outputBuffers = await Promise.all(outputs.map((f) => (0, promises_1.readFile)(`${this.cwd}/${f}`))); // read the output files and store them in the output buffers
    }
    async postRead() { }
}
exports.ImageConverter = ImageConverter;
// ==========================================================================================
// ==========================================================================================
// ==========================================================================================
// ==========================================================================================
// ==========================================================================================
//  Create subclasses of the ImageConverter to tweak couple of things, but not all of them
// like if you converting a pdf to an image, you need to do some extra stuff.
class PdfToConverter extends ImageConverter {
    get from() {
        return 'application/pdf'; // override the from property from the parent class to be "application/pdf"
    }
    constructor(to) {
        super({ mime: 'application/pdf' }, to); // call the parent constructor with the input mime type as "application/pdf" so it will be the same as the from property
    }
    output() {
        const ext = (0, file_1.mimeToFileExtension)(this.to); // get the output file extension
        return `output.${ext}`; // return the output file name in the format of "output.extension"
    }
}
exports.PdfToConverter = PdfToConverter;
for (const to of nodes_1.nodes) {
    if (to.mime === 'application/pdf') {
        // if the to is pdf, skip
        continue;
    }
    _converters.push(new PdfToConverter(to)); // push the converter to the converters array
}
// ==========================================================================================
// ==========================================================================================
// ==========================================================================================
for (const from of nodes_1.nodes) {
    for (const to of nodes_1.nodes) {
        if (from.mime === 'application/pdf') {
            // if the from is pdf, skip
            continue;
        }
        _converters.push(new ImageConverter(from, to)); // push the converter to the converters array
    }
}
exports.converters = _converters; // export the converters
// ==========================================================================================
// ==========================================================================================
// NOTE: the ImageConverter class will have a template methods (i.e. input(), inputOption(), etc...) that will be used by the converters main class, and it can be overridden by a subclass of that converter
// NOTE: the convert function will have some hooks (i.e. preWrite(), exec(), read(), etc...) that can be overridden by a subclass of that converter
// OLD CODE: function component
// const buildConverter = (
//     from: string,
//     to: string,
//     params?: string
// ): Converter => {
//     const converter: Converter = async (buffers: Buffer[]) => {
//         const file = randomUUID() // generate a random file name
//         await writeFile(`/tmp/${file}.${extension(from)}`, buffers[0]) // write the buffer to the file
//         await exec(
//             `${
//                 process.env.NODE_ENV === 'production' ? 'convert' : 'magick'
//             } /tmp/${file}.${extension(from)} ${
//                 params ?? ''
//             } /tmp/${file}.${extension(to)}`
//         ) // convert the file
//         const data = await readFile(`/tmp/${file}.${extension(to)}`) // read the converted file
//         return [data]
//     }
//     converter.from = from
//     converter.to = to
//     return converter
// }
// const _converters: Array<Converter> = []
// for (const from of formats) {
//     for (const to of formats) {
//         if (from.mime === to.mime) {
//             // if it the same format, skip
//             continue
//         }
//         _converters.push(buildConverter(from.mime, to.mime, to.params)) // build the converter
//         // !FOR DEBUGGING
//         console.log(`${from.mime} => ${to.mime}`)
//     }
// }
// export const converters = _converters // export the converters
