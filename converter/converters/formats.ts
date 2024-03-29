import { nodes as ImageNodes } from './image/nodes'
import { nodes as AudioNodes } from './audio/nodes'
import { nodes as DocsNodes } from './docs/nodes'
import { nodes as VideoNodes } from './video/nodes'
import { nodes as ArchiveNodes } from './archive/nodes'
import { nodes as EbookNodes } from './ebook/nodes'
import { nodes as OCRNodes } from './OCR/nodes'
import { nodes as PresentationNodes } from './presentation/nodes'

export const formats = [
    {
        ImageNodes,
        AudioNodes,
        DocsNodes,
        ArchiveNodes,
        VideoNodes,
        EbookNodes,
        OCRNodes,
        PresentationNodes,
    },

    //     ...ImageNodes,
    //     ...AudioNodes,
    //     ...DocsNodes,
    //     ...VideoNodes,
    //     ...ArchiveNodes,
    //     ...EbookNodes,
    //     ...OCRNodes,
    //     ...PresentationNodes,
]
