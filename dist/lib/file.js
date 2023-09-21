"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.byteToSize = exports.fileExtensionToMime = exports.mimeToFileExtension = void 0;
const mime_types_1 = require("mime-types");
// here is the translate layer that will translate any unknown mime type to a known one from our API (i.e.image/vnd.microsoft.icon to image/x-icon)
const _mimes = {
    'image/vnd.microsoft.icon': 'image/x-icon', // ico
};
const _mimeToExtension = {
    'audio/mpeg': 'mp3',
    'audio/aac': 'aac',
};
const _extensionToMime = {
    mp3: 'audio/mpeg',
    aac: 'audio/aac',
};
//  function that returns the file extension from a mime type
const mimeToFileExtension = (mime) => {
    const ext = _mimeToExtension[mime] || (0, mime_types_1.extension)(mime);
    if (!ext) {
        throw new Error(`No file extension found for mime type ${mime}`);
    }
    return ext;
};
exports.mimeToFileExtension = mimeToFileExtension;
//function that returns the mime type from a file extension
const fileExtensionToMime = (ext) => {
    const mime = _extensionToMime[ext] || (0, mime_types_1.lookup)(ext);
    if (!mime) {
        throw new Error(`No mime type found for extension ${ext}`);
    }
    return _mimes[mime] || mime; // if the mime is not in the _mimes object, return the original mime
};
exports.fileExtensionToMime = fileExtensionToMime;
// function that take a file byte and return its actual size
const byteToSize = (bytes) => {
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes == 0)
        return '0 Byte';
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)).toString());
    return Math.round(bytes / Math.pow(1024, i)) + ' ' + sizes[i];
};
exports.byteToSize = byteToSize;
