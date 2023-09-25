"use strict";
// TOOL => pandoc
Object.defineProperty(exports, "__esModule", { value: true });
exports.converters = exports.Pdf2DocxConverter = exports.DocsConverter = void 0;
const types_1 = require("../../types");
const file_1 = require("../../../lib/file");
const child_process_1 = require("child_process");
const crypto_1 = require("crypto");
const promises_1 = require("fs/promises");
const path_1 = require("path");
const util_1 = require("util");
const nodes_1 = require("./nodes");
const exec = (0, util_1.promisify)(child_process_1.exec); // promisify exec which mean we can use await on it
// ============= 2:50:00 =============
const _converters = [];
class DocsConverter extends types_1.Converter {
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
        return ``; // return the input options if exists, otherwise return an empty string
    }
    output() {
        return `output.${(0, file_1.mimeToFileExtension)(this.to)}`; // return the output file name in the format of "output.extension"
    }
    outputOptions() {
        var _a, _b;
        return `${(_b = (_a = this.toNode.options) === null || _a === void 0 ? void 0 : _a.outputs) !== null && _b !== void 0 ? _b : ''} -s -o`; // return the output options if exists, otherwise return an empty string
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
    // async execute() {
    //     C:\Users\lenovo\AppData\Local\Pandoc\pandoc.exe
    //     console.log(
    //         `pandoc ${this.inputOptions()} ${this.input()} ${this.outputOptions()} ${this.output()}`
    //     )
    //     console.log('===============================')
    //     await exec(
    //         `pandoc ${this.inputOptions()} ${this.input()} ${this.outputOptions()} ${this.output()}`,
    //         { cwd: this.cwd }
    //     )
    // }
    async execute() {
        const pandoc = 'C:\\Users\\lenovo\\AppData\\Local\\Pandoc\\pandoc.exe';
        console.log(`"${pandoc}" ${this.inputOptions()} ${this.input()} ${this.outputOptions()} ${this.output()}`);
        console.log('===============================');
        await exec(`"${pandoc}" ${this.inputOptions()} ${this.input()} ${this.outputOptions()} ${this.output()}`, { cwd: this.cwd });
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
exports.DocsConverter = DocsConverter;
//
// TOOL => pdf2docx
class Pdf2DocxConverter extends types_1.Converter {
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
        return ``;
    }
    output() {
        return `output.${(0, file_1.mimeToFileExtension)(this.to)}`;
    }
    outputOptions() {
        var _a, _b;
        return (_b = (_a = this.toNode.options) === null || _a === void 0 ? void 0 : _a.outputs) !== null && _b !== void 0 ? _b : '';
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
    // async execute() {
    //     console.log(
    //         `pdf2docx convert ${this.inputOptions()} ${this.input()} ${this.outputOptions()} ${this.output()}`
    //     )
    //     console.log('===============================')
    //     await exec(
    //         `pdf2docx convert ${this.inputOptions()} ${this.input()} ${this.outputOptions()} ${this.output()}`,
    //         { cwd: this.cwd }
    //     )
    // }
    async execute() {
        const pdf2docxPath = 'C:\\Users\\lenovo\\AppData\\Local\\Programs\\Python\\Python311\\Scripts\\pdf2docx.exe';
        console.log(`"${pdf2docxPath}" convert ${this.inputOptions()} ${this.input()} ${this.outputOptions()} ${this.output()}`);
        console.log('===============================');
        await exec(`"${pdf2docxPath}" convert ${this.inputOptions()} ${this.input()} ${this.outputOptions()} ${this.output()}`, { cwd: this.cwd });
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
exports.Pdf2DocxConverter = Pdf2DocxConverter;
//
for (const from of nodes_1.nodes) {
    for (const to of nodes_1.nodes) {
        if (from.mime === 'application/pdf')
            continue;
        _converters.push(new DocsConverter(from, to)); // push the converter to the converters array
    }
}
_converters.push(new Pdf2DocxConverter(nodes_1.nodes[2], nodes_1.nodes[3])); // push the converter to the converters array between the 3rd and 4th nodes which is pdf to docx
exports.converters = _converters; // export the converters
