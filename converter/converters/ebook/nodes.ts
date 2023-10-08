import { MimeNode } from '@/converter/types'

const nodes: MimeNode[] = []

// EPUB
const ARCHIVE_EPUB: MimeNode = {
    mime: 'application/epub+zip',
}
nodes.push(ARCHIVE_EPUB)

// MOBI
// const ARCHIVE_MOBI: MimeNode = {
//     mime: 'application/x-mobipocket-ebook',
// }
// nodes.push(ARCHIVE_MOBI)

// FictionBook
const ARCHIVE_FB2: MimeNode = {
    mime: 'application/x-fictionbook+xml',
}
nodes.push(ARCHIVE_FB2)

// PDF
const ARCHIVE_PDF: MimeNode = {
    mime: 'application/pdf',
}
nodes.push(ARCHIVE_PDF)

//docx
const ARCHIVE_DOCX: MimeNode = {
    mime: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
}
nodes.push(ARCHIVE_DOCX)

//plain text
const ARCHIVE_PLAINTEXT: MimeNode = {
    mime: 'text/plain',
}
nodes.push(ARCHIVE_PLAINTEXT)

export { nodes }
