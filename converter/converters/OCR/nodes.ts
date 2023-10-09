import { MimeNode } from '@/converter/types'
import { nodes as ImageNodes } from '../image/nodes'
const nodes: MimeNode[] = []

// TEXT Plain
const TEXT_PLAIN: MimeNode = {
    mime: 'text/plain',
}
nodes.push(TEXT_PLAIN)

nodes.push(...ImageNodes)
export { nodes }
