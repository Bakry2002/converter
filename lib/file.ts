import { extension, lookup } from 'mime-types'

// here is the translate layer that will translate any unknown mime type to a known one from our API (i.e.image/vnd.microsoft.icon to image/x-icon)
const _mimes: Record<string, string> = {
    'image/vnd.microsoft.icon': 'image/x-icon', // ico
    'image/jpeg': 'image/jpeg',
    'image/gif': 'image/gif',
    'image/bmp': 'image/bmp',
    'image/webp': 'image/webp',
    'image/tiff': 'image/tiff',
    'image/heic': 'image/heic',
    'image/heif': 'image/heif',
    'image/x-ico': 'image/x-ico',
    'image/png': 'image/png',
}
//  function that returns the file extension from a mime type
export const mimeToFileExtension = (mime: string) => {
    const ext = extension(mime)
    if (!ext) {
        throw new Error(`No file extension found for mime type ${mime}`)
    }
    return ext
}

//function that returns the mime type from a file extension
export const fileExtensionToMime = (ext: string) => {
    const mime = lookup(ext)
    if (!mime) {
        throw new Error(`No mime type found for extension ${ext}`)
    }
    console.log(
        `File mime {${mime}} and file mime in the array: {${_mimes[mime]}}`
    )
    return _mimes[mime] || mime // if the mime is not in the _mimes object, return the original mime
}

// function that take a file byte and return its actual size
export const byteToSize = (bytes: number): string => {
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
    if (bytes == 0) return '0 Byte'
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)).toString())
    return Math.round(bytes / Math.pow(1024, i)) + ' ' + sizes[i]
}
