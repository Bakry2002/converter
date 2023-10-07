import { MimeNode } from '@/converter/types'

const nodes: MimeNode[] = []

// 4 nodes

//ZIP
const ARCHIVE_ZIP: MimeNode = {
    mime: 'application/zip',
}
nodes.push(ARCHIVE_ZIP)

//TAR
const ARCHIVE_TAR: MimeNode = {
    mime: 'application/x-tar',
}
nodes.push(ARCHIVE_TAR)

//7Z
const ARCHIVE_7Z: MimeNode = {
    mime: 'application/x-7z-compressed',
}
nodes.push(ARCHIVE_7Z)

export { nodes }
