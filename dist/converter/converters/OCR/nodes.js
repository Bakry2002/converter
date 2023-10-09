"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nodes = void 0;
const nodes_1 = require("../image/nodes");
const nodes = [];
exports.nodes = nodes;
// TEXT Plain
const TEXT_PLAIN = {
    mime: 'text/plain',
};
nodes.push(TEXT_PLAIN);
nodes.push(...nodes_1.nodes);
