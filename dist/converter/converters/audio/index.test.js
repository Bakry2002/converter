"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
const promises_1 = require("fs/promises");
describe('Audio Converter', () => {
    let audioConverter;
    beforeAll(() => {
        audioConverter = new index_1.AudioConverter({ mime: 'audio/mpeg' }, { mime: 'audio/aac' });
    });
    it('should convert to "test.mp3" to AAC', async () => {
        const audioBuffer = await (0, promises_1.readFile)('D:\\My Work\\converter\\converter\\converters\\audio\\test.mp3');
        await audioConverter.convert([audioBuffer]);
    });
});
// Additional tests can be added as needed
