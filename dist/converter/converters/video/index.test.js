"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
const promises_1 = require("fs/promises");
describe('Video Converter', () => {
    let videoConverter;
    beforeAll(() => {
        videoConverter = new index_1.VideoConverter({ mime: 'video/mp4' }, { mime: 'video/x-matroska' });
    });
    it('should convert to "test.jpeg" to PNG', async () => {
        const imageBuffer = await (0, promises_1.readFile)('D:\\My Work\\converter\\converter\\converters\\video\\test.mp4');
        await videoConverter.convert([imageBuffer]);
    });
    it('should convert to "test.mp4" to MP3', async () => {
        videoConverter = new index_1.VideoToAudioConverter({ mime: 'video/mp4' }, { mime: 'audio/mpeg' });
        const videoBuffer = await (0, promises_1.readFile)('D:\\My Work\\converter\\converter\\converters\\video\\test.mp4');
        await videoConverter.convert([videoBuffer]);
    });
});
// Additional tests can be added as needed
