"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nodes = void 0;
const nodes = [];
exports.nodes = nodes;
//TEXT FILE
const TEXT_PLAIN = {
    mime: 'text/plain',
};
nodes.push(TEXT_PLAIN);
// RICH TYPE FORMAT
const APPLICATION_RTF = {
    mime: 'application/rtf',
};
nodes.push(APPLICATION_RTF);
// PDF
const APPLICATION_PDF = {
    mime: 'application/pdf',
};
nodes.push(APPLICATION_PDF);
// DOCX
const APPLICATION_DOCX = {
    mime: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
};
nodes.push(APPLICATION_DOCX);
//HTML
const TEXT_HTML = {
    mime: 'text/html',
};
nodes.push(TEXT_HTML);
