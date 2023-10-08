import { MimeNode } from '@/converter/types'

const nodes: MimeNode[] = []

// EPUB
const ARCHIVE_EPUB: MimeNode = {
    mime: 'application/epub+zip',
}
nodes.push(ARCHIVE_EPUB)

// MOBI
const ARCHIVE_MOBI: MimeNode = {
    mime: 'application/x-mobipocket-ebook',
}
nodes.push(ARCHIVE_MOBI)

// // FictionBook
// const ARCHIVE_FB2: MimeNode = {
//     mime: 'application/octet-stream',
// }
// nodes.push(ARCHIVE_FB2)

// AZW3 (Amazon Kindle)
const ARCHIVE_AZW3: MimeNode = {
    mime: 'application/vnd.amazon.ebook',
}
nodes.push(ARCHIVE_AZW3)

// LIT (Microsoft Reader)
const ARCHIVE_LIT: MimeNode = {
    mime: 'application/x-ms-reader',
}
nodes.push(ARCHIVE_LIT)

// TCR
const ARCHIVE_TCR: MimeNode = {
    mime: 'application/octet-stream',
}
nodes.push(ARCHIVE_TCR)

// SNB (Shanda Bambook)
const ARCHIVE_SNB: MimeNode = {
    mime: 'application/x-shanda-bambook',
}
nodes.push(ARCHIVE_SNB)

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
