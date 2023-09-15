import { fileExtensionToMime } from '@/lib/file'
import { Format } from '@/lib/types'
import { extension } from 'mime-types'

// Define your formats with placeholders for icons
export const formats: Array<Format & { icon?: string }> = [
    { mime: 'image/bmp', icon: '' },
    { mime: 'image/png', icon: '' },
    { mime: 'image/jpeg', icon: '' },
    { mime: 'image/gif', icon: '' },
    { mime: 'image/webp', icon: '' },
    { mime: 'image/tiff', icon: '' },
    { mime: 'image/heic', icon: '' },
    { mime: 'image/heif', icon: '' },
    { mime: 'image/x-icon', icon: '' }, // ico
]

// function loadImages() {
//     formats.map((format, index) => {
//         // get the extension from the mime type
//         const ext: any = extension(format.mime)

//         // !FOR DEBUGGING
//         console.log('File extension: ', ext)

//         const imageURL = `../../../images/file_type_icons/${ext}.png`

//         // add this to the format object
//         formats[index].icon = imageURL

//         console.log('Formats with icons: ', formats)
//     })
// }

// Function to dynamically load images
// function loadImages() {
//     formats.forEach((format, index) => {
//         // Get the MIME type and construct the image URL
//         const mime = format.mime.split('/')[1] // Get the part after 'image/'
//         const imageUrl = `../../../images/file_type_icons/${mime}.png`

//         // Create an image element
//         const image = new Image()

//         // Set the 'src' attribute to the image URL
//         image.src = imageUrl

//         // Once the image is loaded, update the 'icon' property
//         image.onload = () => {
//             formats[index].icon = imageUrl
//         }
//     })
// }

// Call the function to load the images
///loadImages()
