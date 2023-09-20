import { Converter } from '@/converter/types'
import { ImageConverter, PdfToConverter } from './index'
import { readFile } from 'fs/promises'
import { join } from 'path'

describe('Image Converter', () => {
    let imageConverter: Converter
    let pdfToImageConverter: Converter

    beforeAll(() => {
        imageConverter = new ImageConverter(
            { mime: 'image/jpeg' },
            { mime: 'image/png' }
        )

        pdfToImageConverter = new PdfToConverter({ mime: 'image/jpeg' })
    })

    it('should convert to "test.jpeg" to PNG', async () => {
        const imageBuffer = await readFile(join(__dirname, 'test.jpeg'))
        const results = await imageConverter.convert([imageBuffer])
        const pngMagickSignature = Buffer.from([
            137, 80, 78, 71, 13, 10, 26, 10,
        ])

        for (const pngBuffer of results) {
            expect(pngBuffer.slice(0, pngMagickSignature.length)).toEqual(
                pngMagickSignature
            )
        }
    })

    it('should convert "test.pdf" to JPG format', async () => {
        const pdfBuffer = await readFile(join(__dirname, 'test.pdf'))
        const results = await pdfToImageConverter.convert([pdfBuffer])
        const jpgMagickSignature = Buffer.from([255, 216, 255]) // JPEG signature

        for (const jpgBuffer of results) {
            expect(jpgBuffer.slice(0, jpgMagickSignature.length)).toEqual(
                jpgMagickSignature
            )
        }
    })
})

// Additional tests can be added as needed
