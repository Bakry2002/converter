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
const ARCHIVE_MOBI = {
    mime: 'application/x-mobipocket-ebook',
};
nodes.push(ARCHIVE_MOBI);
// // FictionBook
// const ARCHIVE_FB2: MimeNode = {
//     mime: 'application/octet-stream',
// }
// nodes.push(ARCHIVE_FB2)
// AZW3 (Amazon Kindle)
const ARCHIVE_AZW3 = {
    mime: 'application/vnd.amazon.ebook',
};
nodes.push(ARCHIVE_AZW3);
// LIT (Microsoft Reader)
const ARCHIVE_LIT = {
    mime: 'application/x-ms-reader',
};
nodes.push(ARCHIVE_LIT);
// TCR
const ARCHIVE_TCR = {
    mime: 'application/octet-stream',
};
nodes.push(ARCHIVE_TCR);
// SNB (Shanda Bambook)
const ARCHIVE_SNB = {
    mime: 'application/x-shanda-bambook',
};
nodes.push(ARCHIVE_SNB);
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
