"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PNG_TO_JPG = void 0;
const child_process_1 = require("child_process");
const util_1 = require("util");
const crypto_1 = require("crypto");
const promises_1 = require("fs/promises");
const exec = (0, util_1.promisify)(child_process_1.exec); // promisify exec which mean we can use await on it
const PNG_TO_JPG = async (buf) => {
    //! actual converter process
    const file = (0, crypto_1.randomUUID)(); // generate a random file name
    await (0, promises_1.writeFile)(`/tmp/${file}.png`, buf); // write the buffer to the file
    await exec(`magick /tmp/${file}.png /tmp/${file}.jpg`); // convert the file
    return (0, promises_1.readFile)(`/tmp/${file}.jpg`); // return the converted file
};
exports.PNG_TO_JPG = PNG_TO_JPG;
exports.PNG_TO_JPG.from = 'png';
exports.PNG_TO_JPG.to = 'jpg';
