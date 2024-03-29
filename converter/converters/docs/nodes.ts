import { MimeNode } from '@/converter/types'

const nodes: MimeNode[] = []

// 7 nodes

//TEXT FILE
const TEXT_PLAIN: MimeNode = {
    mime: 'text/plain',
}
nodes.push(TEXT_PLAIN)

// RICH TYPE FORMAT
const APPLICATION_RTF: MimeNode = {
    mime: 'application/rtf',
}
nodes.push(APPLICATION_RTF)

// PDF
const APPLICATION_PDF: MimeNode = {
    mime: 'application/pdf',
}
nodes.push(APPLICATION_PDF)

// DOCX
const APPLICATION_DOCX: MimeNode = {
    mime: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
}
nodes.push(APPLICATION_DOCX)

//HTML
const TEXT_HTML: MimeNode = {
    mime: 'text/html',
}
nodes.push(TEXT_HTML)

//AUDIO
const AUDIO_MP3: MimeNode = {
    mime: 'audio/mpeg',
}
nodes.push(AUDIO_MP3)

// wav
const AUDIO_WAV: MimeNode = {
    mime: 'audio/wav',
}
nodes.push(AUDIO_WAV)

//  main node to check with the file extension
const mainNode: MimeNode[] = nodes.filter((node) =>
    node.mime.startsWith('application' || 'text')
)

export { nodes, mainNode }
