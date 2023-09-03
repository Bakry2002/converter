"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.converters = void 0;
const child_process_1 = require("child_process");
const util_1 = require("util");
const crypto_1 = require("crypto");
const promises_1 = require("fs/promises");
const mime_types_1 = require("mime-types");
const exec = (0, util_1.promisify)(child_process_1.exec); // promisify exec which mean we can use await on it
// EDIT: change the format to be MIME types instead of file extensions
// old format: const formats = ['png', 'jpg', 'gif', 'bmp', 'webp', 'tiff', 'heic', 'heif', 'ico']
const formats = [
    { format: 'image/png', params: undefined },
    { format: 'image/jpg', params: undefined },
    { format: 'image/gif', params: undefined },
    { format: 'image/bmp', params: undefined },
    { format: 'image/webp', params: undefined },
    { format: 'image/tiff', params: undefined },
    { format: 'image/heic', params: undefined },
    { format: 'image/heif', params: undefined },
    { format: 'image/x-icon', params: '-resize 256x256' }, // ico
];
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
const buildConverter = (from, to, params) => {
    const converter = async (buf) => {
        const file = (0, crypto_1.randomUUID)(); // generate a random file name
        await (0, promises_1.writeFile)(`/tmp/${file}.${(0, mime_types_1.extension)(from)}`, buf); // write the buffer to the file
        await exec(`convert /tmp/${file}.${(0, mime_types_1.extension)(from)} ${params !== null && params !== void 0 ? params : ''} /tmp/${file}.${(0, mime_types_1.extension)(to)}`); // convert the file
        return (0, promises_1.readFile)(`/tmp/${file}.${(0, mime_types_1.extension)(to)}`); // return the converted file
    };
    converter.from = from;
    converter.to = to;
    return converter;
};
// EDIT: change the converter to use MIME types instead of file extensions
const _converters = [];
for (const from of formats) {
    for (const to of formats) {
        if (from === to) {
            // if it the same format, skip
            continue;
        }
        _converters.push(buildConverter(from.format, to.format, to.params)); // build the converter
    }
}
exports.converters = _converters; // export the converters
