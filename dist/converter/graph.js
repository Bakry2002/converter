"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findPath = exports.nodes = void 0;
// import all the converters
const rawConverters = __importStar(require("./converters"));
const converters = rawConverters;
const nodes = {};
exports.nodes = nodes;
Object.keys(converters).forEach((key) => {
    const converter = converters[key];
    nodes[converter.to] = nodes[converter.to] || {
        type: converter.to,
        edges: [],
    };
    nodes[converter.from] = nodes[converter.from] || {
        type: converter.from,
        edges: [],
    };
    nodes[converter.from].edges.push({
        converter,
        from: nodes[converter.from],
        to: nodes[converter.to],
    });
});
//this search is breadth-first, which means it will find the shortest path
function findPath(start, end) {
    const visited = {}; // this is a set of nodes we have visited'
    const queue = []; // this is a queue of paths we are exploring
    queue.push({ node: nodes[start], path: [] }); // add the start node to the queue
    visited[start] = true; // mark the start node as visited
    while (queue.length > 0) {
        const currentNode = queue.shift(); // get the next node to explore
        if (!currentNode) {
            continue;
        }
        if (currentNode.node.type === end) {
            // if we have found the end node, return the path
            return currentNode.path; // return the path
        }
        // otherwise, we need to add the edges to the queue
        for (const edge of currentNode.node.edges) {
            if (visited[edge.to.type]) {
                // if we have already visited this node, skip it
                continue;
            }
            queue.push({
                node: edge.to,
                path: [...currentNode.path, edge],
            }); // add a new path with the edge's destination
            visited[edge.to.type] = true; // mark the node as visited after we check it
        }
    }
    // we have not found a path
    return null;
}
exports.findPath = findPath;
