"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nodes = void 0;
const nodes = [];
exports.nodes = nodes;
// 4 nodes
//ZIP
const ARCHIVE_ZIP = {
    mime: 'application/zip',
};
nodes.push(ARCHIVE_ZIP);
//TAR
const ARCHIVE_TAR = {
    mime: 'application/x-tar',
};
nodes.push(ARCHIVE_TAR);
//7Z
const ARCHIVE_7Z = {
    mime: 'application/x-7z-compressed',
};
nodes.push(ARCHIVE_7Z);
