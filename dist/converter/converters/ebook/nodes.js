"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nodes = void 0;
const nodes = [];
exports.nodes = nodes;
// EPUB
const ARCHIVE_EPUB = {
    mime: 'application/epub+zip',
};
nodes.push(ARCHIVE_EPUB);
// MOBI
// const ARCHIVE_MOBI: MimeNode = {
//     mime: 'application/x-mobipocket-ebook',
// }
// nodes.push(ARCHIVE_MOBI)
// FictionBook
const ARCHIVE_FB2 = {
    mime: 'application/x-fictionbook+xml',
};
nodes.push(ARCHIVE_FB2);
// PDF
const ARCHIVE_PDF = {
    mime: 'application/pdf',
};
nodes.push(ARCHIVE_PDF);
//docx
const ARCHIVE_DOCX = {
    mime: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
};
nodes.push(ARCHIVE_DOCX);
//plain text
const ARCHIVE_PLAINTEXT = {
    mime: 'text/plain',
};
nodes.push(ARCHIVE_PLAINTEXT);
