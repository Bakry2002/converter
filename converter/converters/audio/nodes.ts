import { MimeNode } from './../../types'

const nodes: MimeNode[] = []

// 3 nodes

// MPEG
const AUDIO_MPEG: MimeNode = {
    mime: 'audio/mpeg',
}
nodes.push(AUDIO_MPEG)

//WAV
const AUDIO_WAV: MimeNode = {
    mime: 'audio/wav',
}
nodes.push(AUDIO_WAV)

//AAC
const AUDIO_AAC: MimeNode = {
    mime: 'audio/aac',
}
nodes.push(AUDIO_AAC)

//  main node to check with the file extension
const mainNode: MimeNode[] = nodes.filter((node) =>
    node.mime.startsWith('audio')
)

export { nodes, mainNode }
