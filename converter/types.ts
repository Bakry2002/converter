export interface Options {
    inputs?: string
    outputs?: string
}

export type MimeNode = {
    mime: string
    options?: Options
}

export abstract class Converter {
    abstract get from(): string // the mime type of the input file
    abstract get to(): string // the mime type of the output file

    constructor(readonly fromNode: MimeNode, readonly toNode: MimeNode) {} // the constructor will take the input and output mime types and store them in the class
    // why readonly ? because we don't want to change the input and output mime, we just want to store them

    abstract convert(buffers: Buffer[]): Promise<Buffer[]> // the convert function will take the input file and convert it to the output file
}

// do it as a class rather than a function is making more sense to me because we want to have overrides for different conversions when we add more converters
