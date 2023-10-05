"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
const promises_1 = require("fs/promises");
describe('Image Converter', () => {
    let imageConverter;
    let pdfToImageConverter;
    beforeAll(() => {
        imageConverter = new index_1.ImageConverter({ mime: 'image/jpeg' }, { mime: 'image/png' });
        pdfToImageConverter = new index_1.PdfToConverter({ mime: 'image/jpeg' });
    });
    it('should convert to "test.jpeg" to PNG', async () => {
        const imageBuffer = await (0, promises_1.readFile)('D:\\My Work\\converter\\converter\\converters\\image\\test.jpeg');
        const results = await imageConverter.convert([imageBuffer]);
        const pngMagickSignature = Buffer.from([
            137, 80, 78, 71, 13, 10, 26, 10,
        ]);
        for (const pngBuffer of results) {
            expect(pngBuffer.slice(0, pngMagickSignature.length)).toEqual(pngMagickSignature);
        }
    });
    it('should convert "test.pdf" to JPG format', async () => {
        const pdfBuffer = await (0, promises_1.readFile)('D:\\My Work\\converter\\converter\\converters\\image\\test.pdf');
        const results = await pdfToImageConverter.convert([pdfBuffer]);
        const jpgMagickSignature = Buffer.from([255, 216, 255]); // JPEG signature
        for (const jpgBuffer of results) {
            expect(jpgBuffer.slice(0, jpgMagickSignature.length)).toEqual(jpgMagickSignature);
        }
    });
});
// Additional tests can be added as needed
