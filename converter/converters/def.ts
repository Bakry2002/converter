// OLD
// will take a buffer and also return a buffer
// it take a bytes and return different bytes
// export interface Converter {
//     (buf: Buffer): Promise<Buffer>
//     from: string
//     to: string
// }

// NEW
// instead of one buffer,  it will have an array of buffers
export interface Converter {
    (buffers: Buffer[]): Promise<Buffer[]>
    from: string
    to: string
}
