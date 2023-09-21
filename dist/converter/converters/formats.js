"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formats = void 0;
const nodes_1 = require("./image/nodes");
const nodes_2 = require("./audio/nodes");
exports.formats = [...nodes_1.nodes, ...nodes_2.nodes];
