import { Converter } from '@/converter/types'
import { AudioConverter } from './index'
import { readFile } from 'fs/promises'

describe('Audio Converter', () => {
    let audioConverter: Converter

    beforeAll(() => {
        audioConverter = new AudioConverter(
            { mime: 'audio/mpeg' },
            { mime: 'audio/aac' }
        )
    })

    it('should convert to "test.mp3" to AAC', async () => {
        const audioBuffer = await readFile(
            'D:\\My Work\\converter\\converter\\converters\\audio\\test.mp3'
        )
        await audioConverter.convert([audioBuffer])
    })
})

// Additional tests can be added as needed
