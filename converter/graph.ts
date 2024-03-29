import { converters as imageConverters } from './converters/image'
import { converters as AudioConverters } from './converters/audio'
import { converters as DocsConverters } from './converters/docs'
import { converters as VideoConverter } from './converters/video'
import { converters as ArchiveConverter } from './converters/archive'
import { converters as EbookConverter } from './converters/ebook'
import { converters as OCRConverter } from './converters/OCR'
import { converters as PresentationConverter } from './converters/presentation'
//==============================================================================================
import { nodes as imageNodes } from './converters/image/nodes'
import { nodes as AudioNodes } from './converters/audio/nodes'
import { nodes as DocsNodes } from './converters/docs/nodes'
import { nodes as VideoNodes } from './converters/video/nodes'
import { nodes as ArchiveNodes } from './converters/archive/nodes'
import { nodes as EbookNodes } from './converters/ebook/nodes'
import { nodes as OCRNodes } from './converters/OCR/nodes'
import { nodes as PresentationNodes } from './converters/presentation/nodes'
//==============================================================================================
import { Converter, MimeNode } from './types'

const converters: Converter[] = [
    ...imageConverters,
    ...AudioConverters,
    ...DocsConverters,
    ...VideoConverter,
    ...ArchiveConverter,
    ...EbookConverter,
    ...OCRConverter,
    ...PresentationConverter,
] // combine all the converters into one array
const allNodes: MimeNode[] = [
    ...imageNodes,
    ...AudioNodes,
    ...DocsNodes,
    ...VideoNodes,
    ...ArchiveNodes,
    ...EbookNodes,
    ...OCRNodes,
    ...PresentationNodes,
]

type Edge = {
    converter: Converter
    from: GraphNode
    to: GraphNode
}

type GraphNode = MimeNode & {
    edges: Edge[]
}

const nodes: Record<string, GraphNode> = {}
for (const node of allNodes) {
    nodes[node.mime] = { ...node, edges: [] }
}

for (const converter of converters) {
    const from = nodes[converter.from]
    const to = nodes[converter.to]

    from.edges.push({
        converter,
        from,
        to,
    })
}

// !FOR DEBUGGING
console.log('Graph: ', nodes)

export { nodes }

export type Path = Edge[] | null

//this search is breadth-first, which means it will find the shortest path
export function findPath(start: string, end: string) {
    const visited: Record<string, boolean> = {} // this is a set of nodes we have visited'
    const queue: { node: GraphNode; path: Edge[] }[] = [] // this is a queue of paths we are exploring

    queue.push({ node: nodes[start], path: [] }) // add the start node to the queue
    visited[start] = true // mark the start node as visited

    while (queue.length > 0) {
        const currentNode = queue.shift() // get the next node to explore
        if (!currentNode) {
            continue
        }

        if (currentNode.node.mime === end) {
            // if we have found the end node, return the path
            return currentNode.path // return the path
        }

        // otherwise, we need to add the edges to the queue
        for (const edge of currentNode.node.edges) {
            if (!visited[edge.to.mime]) {
                // if we have already visited this node, skip it
                queue.push({
                    node: edge.to,
                    path: [...currentNode.path, edge],
                }) // add a new path with the edge's destination
                visited[edge.to.mime] = true // mark the node as visited after we check it
            }
        }
    }

    // we have not found a path
    return null
}
