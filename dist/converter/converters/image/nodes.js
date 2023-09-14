"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nodes = void 0;
const nodes = [];
exports.nodes = nodes;
// JPEG, JPG
const IMAGE_JPEG = {
    mime: 'image/jpeg',
};
nodes.push(IMAGE_JPEG);
// PNG
const IMAGE_PNG = {
    mime: 'image/png',
};
nodes.push(IMAGE_PNG);
// GIF
const IMAGE_GIF = {
    mime: 'image/gif',
};
nodes.push(IMAGE_GIF);
// ICO
const IMAGE_ICO = {
    mime: 'image/x-icon',
    options: {
        outputs: '-resize 256x256',
    },
};
nodes.push(IMAGE_ICO);
// PDF
const APPLICATION_PDF = {
    mime: 'application/pdf',
};
nodes.push(APPLICATION_PDF);
