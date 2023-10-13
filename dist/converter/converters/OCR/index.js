"use strict";
// TOOL => tesseract (OCR)
Object.defineProperty(exports, "__esModule", { value: true });
exports.converters = exports.OCR = void 0;
const child_process_1 = require("child_process");
const util_1 = require("util");
const crypto_1 = require("crypto");
const promises_1 = require("fs/promises");
const types_1 = require("../../types");
const file_1 = require("../../../lib/file");
const path_1 = require("path");
const nodes_1 = require("./nodes");
const exec = (0, util_1.promisify)(child_process_1.exec);
const tesseractPath = '"C:\\Program Files\\Tesseract-OCR\\tesseract.exe"';
const _converters = [];
class OCR extends types_1.Converter {
    constructor() {
        // private OCRLanguage: string = 'eng' // the OCR language default is english
        super(...arguments);
        this.cwd = ''; // the current working directory
        this.inputs = []; // the input files
        this.outputBuffers = []; // the output buffers
    }
    // constructor(
    //     fromNode: MimeNode,
    //     toNode: MimeNode
    //     // OCRLanguage: string = 'eng'
    // ) {
    //     super(fromNode, { mime: 'text/plain' })
    // }
    get from() {
        return this.fromNode.mime;
    }
    get to() {
        return (this.toNode.mime = 'text/plain');
    }
    input() {
        return this.inputs.join(' '); // join the input files with a space, meaning that if we have 2 files, it will be "file1 file2"
    }
    inputOptions() {
        var _a, _b;
        return `${(_b = (_a = this.fromNode.options) === null || _a === void 0 ? void 0 : _a.inputs) !== null && _b !== void 0 ? _b : ''}`; // return the input options if exists, otherwise return an empty string
    }
    output() {
        return `output`; // return the output file name in the format of "output.extension"
    }
    outputOptions() {
        var _a, _b;
        return `${(_b = (_a = this.toNode.options) === null || _a === void 0 ? void 0 : _a.outputs) !== null && _b !== void 0 ? _b : ''}`; // return the output options if exists, otherwise return an empty string
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
        console.log('===============================');
        return buffers;
    }
    async write(buffers) {
        this.inputs = await Promise.all(
        // why Promise.all ? because we want to wait for all the files to be written to the disk before we continue
        buffers.map(async (b) => {
            const name = `${(0, crypto_1.randomUUID)()}.${(0, file_1.mimeToFileExtension)(this.from)}`; // generate a random file name with the input file extension
            return (0, promises_1.writeFile)((0, path_1.join)(this.cwd, name), b).then(() => name); // write the buffer to the file and return the file name
        }));
    }
    async postWrite() { }
    async preConvert() { }
    async execute() {
        console.log(`${process.env.NODE_ENV === 'development'
            ? tesseractPath
            : 'tesseract'}${this.inputOptions()} ${this.input()} ${this.output()} ${this.outputOptions()}`);
        console.log('===============================');
        await exec(`${process.env.NODE_ENV === 'development'
            ? tesseractPath
            : 'tesseract'}${this.inputOptions()} ${this.input()} ${this.output()} ${this.outputOptions()}`, { cwd: this.cwd });
    }
    async postConvert() { }
    async preRead() { }
    async read() {
        // !FOR DEBUGGING
        console.log('Inputs: ', this.inputs);
        console.log('===============================');
        const outputs = (await (0, promises_1.readdir)(this.cwd)).filter((f) => !this.inputs.includes(f) // filter the output files, meaning that we will only get the output files that are not in the input files
        ); // read the output directory
        // !FOR DEBUGGING
        console.log('Outputs: ', outputs);
        console.log('===============================');
        this.outputBuffers = await Promise.all(outputs.map((f) => (0, promises_1.readFile)(`${this.cwd}/${f}`))); // read the output files and store them in the output buffers
    }
    async postRead() { }
}
exports.OCR = OCR;
for (const from of nodes_1.nodes) {
    for (const to of nodes_1.nodes) {
        // only iif the from is image and the to is text
        if (from.mime.startsWith('image/') && to.mime === 'text/plain')
            _converters.push(new OCR(from, to)); // push the converter to the converters array
        continue;
    }
}
exports.converters = _converters;
