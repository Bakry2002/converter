"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findPath = exports.nodes = void 0;
const image_1 = require("./converters/image");
const nodes_1 = require("./converters/image/nodes");
const converters = [...image_1.converters]; // combine all the converters into one array
const nodes = {};
exports.nodes = nodes;
for (const node of nodes_1.nodes) {
    nodes[node.mime] = { ...node, edges: [] };
}
for (const converter of converters) {
    const from = nodes[converter.from];
    const to = nodes[converter.to];
    from.edges.push({
        converter,
        from,
        to,
    });
}
// !FOR DEBUGGING
console.log('Graph: ', nodes);
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
        if (currentNode.node.mime === end) {
            // if we have found the end node, return the path
            return currentNode.path; // return the path
        }
        // otherwise, we need to add the edges to the queue
        for (const edge of currentNode.node.edges) {
            if (!visited[edge.to.mime]) {
                // if we have already visited this node, skip it
                queue.push({
                    node: edge.to,
                    path: [...currentNode.path, edge],
                }); // add a new path with the edge's destination
                visited[edge.to.mime] = true; // mark the node as visited after we check it
            }
        }
    }
    // we have not found a path
    return null;
}
exports.findPath = findPath;
