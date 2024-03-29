"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formats = void 0;
const nodes_1 = require("./image/nodes");
const nodes_2 = require("./audio/nodes");
const nodes_3 = require("./docs/nodes");
const nodes_4 = require("./video/nodes");
const nodes_5 = require("./archive/nodes");
const nodes_6 = require("./ebook/nodes");
const nodes_7 = require("./OCR/nodes");
const nodes_8 = require("./presentation/nodes");
exports.formats = [
    ...nodes_1.nodes,
    ...nodes_2.nodes,
    ...nodes_3.nodes,
    ...nodes_4.nodes,
    ...nodes_5.nodes,
    ...nodes_6.nodes,
    ...nodes_7.nodes,
    ...nodes_8.nodes,
];
