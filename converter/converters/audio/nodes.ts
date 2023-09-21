import { MimeNode } from '@/converter/types'

const nodes: MimeNode[] = []

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

export { nodes }
