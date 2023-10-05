"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
const promises_1 = require("fs/promises");
describe('Pandoc => Document Converter', () => {
    let docsConverter;
    beforeAll(() => {
        docsConverter = new index_1.DocsConverter({
            mime: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        }, { mime: 'application/rtf' });
    });
    it('Using Pandoc => should convert to "test.docx" to RTF', async () => {
        const docBuffer = await (0, promises_1.readFile)('D:\\My Work\\converter\\converter\\converters\\docs\\test.docx');
        await docsConverter.convert([docBuffer]);
    });
});
describe('Pdf2Docx => Document Converter', () => {
    let docsConverter;
    beforeAll(() => {
        docsConverter = new index_1.Pdf2DocxConverter({
            mime: 'application/pdf',
        }, {
            mime: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        });
    });
    it('Using Pdf2Docs => should convert to "test.pdf" to docx', async () => {
        const pdfBuffer = await (0, promises_1.readFile)('D:\\My Work\\converter\\converter\\converters\\docs\\test.pdf');
        await docsConverter.convert([pdfBuffer]);
    });
});
describe('gtts => Document Converter', () => {
    let docsConverter;
    beforeAll(() => {
        docsConverter = new index_1.TxtToAudioConverter({
            mime: 'audio/mpeg',
        });
    });
    it('Using gtts => should convert to "test.txt" to MP3', async () => {
        const pdfBuffer = await (0, promises_1.readFile)('D:\\My Work\\converter\\converter\\converters\\docs\\test.txt');
        await docsConverter.convert([pdfBuffer]);
    });
});
describe('pdftotext => Document Converter', () => {
    let docsConverter;
    beforeAll(() => {
        docsConverter = new index_1.PdfToTxtConverter({
            mime: 'text/plain',
        });
    });
    it('Using gtts => should convert to "test.txt" to MP3', async () => {
        const pdfBuffer = await (0, promises_1.readFile)('D:\\My Work\\converter\\converter\\converters\\docs\\test.pdf');
        await docsConverter.convert([pdfBuffer]);
    });
});
// Additional tests can be added as needed
