import { Converter } from '@/converter/types'
import {
    DocsConverter,
    Pdf2DocxConverter,
    TxtToAudioConverter,
    PdfToTxtConverter,
} from './index'
import { readFile } from 'fs/promises'

describe('Pandoc => Document Converter', () => {
    let docsConverter: Converter

    beforeAll(() => {
        docsConverter = new DocsConverter(
            {
                mime: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            },
            { mime: 'application/rtf' }
        )
    })

    it('Using Pandoc => should convert to "test.docx" to RTF', async () => {
        const docBuffer = await readFile(
            'D:\\My Work\\converter\\converter\\converters\\docs\\test.docx'
        )
        await docsConverter.convert([docBuffer])
    })
})

describe('Pdf2Docx => Document Converter', () => {
    let docsConverter: Converter

    beforeAll(() => {
        docsConverter = new Pdf2DocxConverter(
            {
                mime: 'application/pdf',
            },
            {
                mime: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            }
        )
    })

    it('Using Pdf2Docs => should convert to "test.pdf" to docx', async () => {
        const pdfBuffer = await readFile(
            'D:\\My Work\\converter\\converter\\converters\\docs\\test.pdf'
        )

        await docsConverter.convert([pdfBuffer])
    })
})

describe('gtts => Document Converter', () => {
    let docsConverter: Converter

    beforeAll(() => {
        docsConverter = new TxtToAudioConverter({
            mime: 'audio/mpeg',
        })
    })

    it('Using gtts => should convert to "test.txt" to MP3', async () => {
        const pdfBuffer = await readFile(
            'D:\\My Work\\converter\\converter\\converters\\docs\\test.txt'
        )

        await docsConverter.convert([pdfBuffer])
    })
})

describe('pdftotext => Document Converter', () => {
    let docsConverter: Converter

    beforeAll(() => {
        docsConverter = new PdfToTxtConverter({
            mime: 'text/plain',
        })
    })

    it('Using gtts => should convert to "test.txt" to MP3', async () => {
        const pdfBuffer = await readFile(
            'D:\\My Work\\converter\\converter\\converters\\docs\\test.pdf'
        )

        await docsConverter.convert([pdfBuffer])
    })
})
// Additional tests can be added as needed
