"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nodes = void 0;
const nodes = [];
exports.nodes = nodes;
// PPTX
const APPLICATION_PPTX = {
    mime: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
};
nodes.push(APPLICATION_PPTX);
// PPT
const APPLICATION_PPT = {
    mime: 'application/vnd.ms-powerpoint',
};
nodes.push(APPLICATION_PPT);
// ODP
const APPLICATION_ODP = {
    mime: 'application/vnd.oasis.opendocument.presentation',
};
nodes.push(APPLICATION_ODP);
// POT
const APPLICATION_POT = {
    mime: 'application/vnd.ms-powerpoint',
};
nodes.push(APPLICATION_POT);
