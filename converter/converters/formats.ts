import { nodes as ImageNodes } from './image/nodes'
import { nodes as AudioNodes } from './audio/nodes'
import { nodes as DocsNodes } from './docs/nodes'
import { nodes as VideoNodes } from './video/nodes'
import { nodes as ArchiveNodes } from './archive/nodes'
import { nodes as EbookNodes } from './ebook/nodes'

export const formats = [
    ...ImageNodes,
    ...AudioNodes,
    ...DocsNodes,
    ...VideoNodes,
    ...ArchiveNodes,
    ...EbookNodes,
]
