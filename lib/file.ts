import { extension, lookup } from 'mime-types'

//  function that returns the file extension from a mime type
export const mimeToFileExtension = (mime: string) => extension(mime)

//function that returns the mime type from a file extension
export const fileExtensionToMime = (ext: string) => lookup(ext)

// function that take a file byte and return its actual size
export const byteToSize = (bytes: number): string => {
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
    if (bytes == 0) return '0 Byte'
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)).toString())
    return Math.round(bytes / Math.pow(1024, i)) + ' ' + sizes[i]
}
