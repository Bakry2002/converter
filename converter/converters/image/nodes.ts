import { MimeNode } from '@/converter/types'

const nodes: MimeNode[] = []

// JPEG, JPG
const IMAGE_JPEG: MimeNode = {
    mime: 'image/jpeg',
}
nodes.push(IMAGE_JPEG)

// PNG
const IMAGE_PNG: MimeNode = {
    mime: 'image/png',
}
nodes.push(IMAGE_PNG)

// GIF
const IMAGE_GIF: MimeNode = {
    mime: 'image/gif',
}
nodes.push(IMAGE_GIF)

// ICO
const IMAGE_ICO: MimeNode = {
    mime: 'image/x-icon',
    options: {
        outputs: '-resize 256x256',
    },
}
nodes.push(IMAGE_ICO)

// WEBP
const IMAGE_WEBP: MimeNode = {
    mime: 'image/webp',
}
nodes.push(IMAGE_WEBP)

// PDF
const APPLICATION_PDF: MimeNode = {
    mime: 'application/pdf',
}
nodes.push(APPLICATION_PDF)

export { nodes }
