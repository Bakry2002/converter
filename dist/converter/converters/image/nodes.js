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
// WEBP
const IMAGE_WEBP = {
    mime: 'image/webp',
};
nodes.push(IMAGE_WEBP);
//BMP
const IMAGE_BMP = {
    mime: 'image/bmp',
};
nodes.push(IMAGE_BMP);
//TIFF
const IMAGE_TIFF = {
    mime: 'image/tiff',
};
nodes.push(IMAGE_TIFF);
//PSD
const IMAGE_VND_ADOBE_PHOTOSHOP = {
    mime: 'image/vnd.adobe.photoshop',
};
nodes.push(IMAGE_VND_ADOBE_PHOTOSHOP);
//SVG
const IMAGE_SVG_XML = {
    mime: 'image/svg+xml',
};
nodes.push(IMAGE_SVG_XML);
//HEIC
const IMAGE_HEIC = {
    mime: 'image/heic',
};
nodes.push(IMAGE_HEIC);
//HEIF
const IMAGE_HEIF = {
    mime: 'image/heif',
};
nodes.push(IMAGE_HEIF);
// JP2 JPX JPM => different compression methods for the same format
const IMAGE_JP2 = {
    mime: 'image/jp2',
};
nodes.push(IMAGE_JP2);
nodes.push({
    mime: 'image/jpx',
});
nodes.push({
    mime: 'image/jpm',
});
// // JXL
// const IMAGE_JXL: MimeNode = {
//     mime: 'image/jxl',
// }
// nodes.push(IMAGE_JXL)
// PDF
const APPLICATION_PDF = {
    mime: 'application/pdf',
};
nodes.push(APPLICATION_PDF);
