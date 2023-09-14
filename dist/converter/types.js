"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Converter = void 0;
class Converter {
    constructor(fromNode, toNode) {
        this.fromNode = fromNode;
        this.toNode = toNode;
    } // the constructor will take the input and output mime types and store them in the class
}
exports.Converter = Converter;
// do it as a class rather than a function is making more sense to me because we want to have overrides for different conversions when we add more converters
