"use strict";
// TOOL => 7z-Zip
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.converters = exports.ArchiveConverter = void 0;
const types_1 = require("../../types");
const file_1 = require("../../../lib/file");
const child_process_1 = require("child_process");
const crypto_1 = require("crypto");
const promises_1 = require("fs/promises");
const path_1 = __importStar(require("path"));
const util_1 = require("util");
const fs_extra_1 = require("fs-extra"); // Import the fs-extra library for file operations
const nodes_1 = require("./nodes");
const exec = (0, util_1.promisify)(child_process_1.exec); // promisify exec which mean we can use await on it
const zPath = '"C:\\Program Files\\7-Zip\\7z.exe"'; // path to 7z.exe
// ================================================================
const _converters = [];
class ArchiveConverter extends types_1.Converter {
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
        return `${(_b = (_a = this.fromNode.options) === null || _a === void 0 ? void 0 : _a.inputs) !== null && _b !== void 0 ? _b : ''} -i`; // return the input options if exists, otherwise return an empty string
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
        console.log('===============================');
        return buffers;
    }
    async write(buffers) {
        this.inputs = await Promise.all(
        // why Promise.all ? because we want to wait for all the files to be written to the disk before we continue
        buffers.map(async (b) => {
            const name = `${(0, crypto_1.randomUUID)()}.${(0, file_1.mimeToFileExtension)(this.from)}`; // generate a random file name with the input file extension
            return (0, promises_1.writeFile)(path_1.default.join(this.cwd, name), b).then(() => name); // write the buffer to the file and return the file name
        }));
    }
    async postWrite() { }
    async preConvert() { }
    async execute() {
        // Define the input and output file paths
        const fromFile = path_1.default.join(this.cwd, this.inputs[0]); // Assuming there is only one input file
        const toFile = path_1.default.join(this.cwd, this.output());
        // Create a temporary directory for extracting files
        const extractionFolder = path_1.default.join(this.cwd, 'extracted');
        await (0, fs_extra_1.ensureDir)(extractionFolder);
        // Unzip the 'from' file into the extraction folder using 7z
        const unzipCommand = `${process.env.NODE_ENV === 'development' ? zPath : '7z'} x "${fromFile}" -o"${extractionFolder}"`;
        console.log('firstCommand: ', unzipCommand);
        await exec(unzipCommand);
        // Zip the extracted files into a new archive with the 'to' format
        const zipCommand = `${process.env.NODE_ENV === 'development' ? zPath : '7z'} a "${toFile}" "${extractionFolder}"/*`;
        console.log('SecondCommand: ', zipCommand);
        await exec(zipCommand);
        // Clean up: Remove the temporary extraction folder
        await (0, fs_extra_1.remove)(extractionFolder);
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
exports.ArchiveConverter = ArchiveConverter;
for (const from of nodes_1.nodes) {
    for (const to of nodes_1.nodes) {
        _converters.push(new ArchiveConverter(from, to)); // push the converter to the converters array
    }
}
exports.converters = _converters; // export the converters
