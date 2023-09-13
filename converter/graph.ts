import { Converter } from './converters/def'
// import all the converters
import { converters as images } from './converters/image/converters'

const converters = [...images] // combine all the converters into one array

type Edge = {
    converter: Converter
    from: Node
    to: Node
}

type Node = {
    type: string
    edges: Edge[]
}

const nodes: Record<string, Node> = {}

converters.forEach((converter) => {
    nodes[converter.to] = nodes[converter.to] || {
        type: converter.to,
        edges: [],
    }

    nodes[converter.from] = nodes[converter.from] || {
        type: converter.from,
        edges: [],
    }

    nodes[converter.from].edges.push({
        converter,
        from: nodes[converter.from],
        to: nodes[converter.to],
    })
})

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< Updated upstream
=======
// !FOR DEBUGGING
console.log('Graph: ', nodes)

>>>>>>> Stashed changes
=======
>>>>>>> parent of 685184b (new data model with stages and artifacts)
=======
>>>>>>> parent of 685184b (new data model with stages and artifacts)
export { nodes }

export type Path = Edge[] | null

//this search is breadth-first, which means it will find the shortest path
export function findPath(start: string, end: string) {
    const visited: Record<string, boolean> = {} // this is a set of nodes we have visited'
    const queue: { node: Node; path: Edge[] }[] = [] // this is a queue of paths we are exploring

    queue.push({ node: nodes[start], path: [] }) // add the start node to the queue
    visited[start] = true // mark the start node as visited

    while (queue.length > 0) {
        const currentNode = queue.shift() // get the next node to explore
        if (!currentNode) {
            continue
        }

        if (currentNode.node.type === end) {
            // if we have found the end node, return the path
            return currentNode.path // return the path
        }

        // otherwise, we need to add the edges to the queue
        for (const edge of currentNode.node.edges) {
            if (!visited[edge.to.type]) {
                // if we have already visited this node, skip it
                queue.push({
                    node: edge.to,
                    path: [...currentNode.path, edge],
                }) // add a new path with the edge's destination
                visited[edge.to.type] = true // mark the node as visited after we check it
            }
        }
    }

    // we have not found a path
    return null
}
