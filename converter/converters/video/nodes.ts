import { MimeNode } from '@/converter/types'

const nodes: MimeNode[] = []

// 10 nodes
//MP4
const AUDIO_MP4: MimeNode = {
    mime: 'video/mp4',
}
nodes.push(AUDIO_MP4)

//OGG
const AUDIO_OGG: MimeNode = {
    mime: 'video/ogg',
}
nodes.push(AUDIO_OGG)

//WEBM
const AUDIO_WEBM: MimeNode = {
    mime: 'video/webm',
}
nodes.push(AUDIO_WEBM)

//WMV
const AUDIO_MKV: MimeNode = {
    mime: 'video/x-ms-wmv',
}
nodes.push(AUDIO_MKV)

// MKV
const AUDIO_WMV: MimeNode = {
    mime: 'video/x-matroska',
}
nodes.push(AUDIO_WMV)

//AVI
const AUDIO_AVI: MimeNode = {
    mime: 'video/x-msvideo',
}
nodes.push(AUDIO_AVI)

//MPEG
const AUDIO_MPEG: MimeNode = {
    mime: 'video/mpeg',
}
nodes.push(AUDIO_MPEG)

//MP3
const AUDIO_MP3: MimeNode = {
    mime: 'audio/mpeg',
}
nodes.push(AUDIO_MP3)

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
