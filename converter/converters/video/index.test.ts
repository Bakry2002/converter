import { Converter } from '@/converter/types'
import { VideoConverter, VideoToAudioConverter } from './index'
import { readFile } from 'fs/promises'
import { join } from 'path'

describe('Video Converter', () => {
    let videoConverter: Converter

    beforeAll(() => {
        videoConverter = new VideoConverter(
            { mime: 'video/mp4' },
            { mime: 'video/x-matroska' }
        )
    })

    it('should convert to "test.jpeg" to PNG', async () => {
        const imageBuffer = await readFile(
            'D:\\My Work\\converter\\converter\\converters\\video\\test.mp4'
        )
        await videoConverter.convert([imageBuffer])
    })

    it('should convert to "test.mp4" to MP3', async () => {
        videoConverter = new VideoToAudioConverter(
            { mime: 'video/mp4' },
            { mime: 'audio/mpeg' }
        )

        const videoBuffer = await readFile(
            'D:\\My Work\\converter\\converter\\converters\\video\\test.mp4'
        )
        await videoConverter.convert([videoBuffer])
    })
})

// Additional tests can be added as needed
