import { MimeNode } from '@/converter/types'

const nodes: MimeNode[] = []

// PPTX
const APPLICATION_PPTX: MimeNode = {
    mime: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
}
nodes.push(APPLICATION_PPTX)

// PPT
const APPLICATION_PPT: MimeNode = {
    mime: 'application/vnd.ms-powerpoint',
}
nodes.push(APPLICATION_PPT)

// ODP
const APPLICATION_ODP: MimeNode = {
    mime: 'application/vnd.oasis.opendocument.presentation',
}
nodes.push(APPLICATION_ODP)

// POT
const APPLICATION_POT: MimeNode = {
    mime: 'application/vnd.ms-powerpoint',
}
nodes.push(APPLICATION_POT)

export { nodes }
