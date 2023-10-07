"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nodes = void 0;
const nodes = [];
exports.nodes = nodes;
// 3 nodes
// MPEG
const AUDIO_MPEG = {
    mime: 'audio/mpeg',
};
nodes.push(AUDIO_MPEG);
//WAV
const AUDIO_WAV = {
    mime: 'audio/wav',
};
nodes.push(AUDIO_WAV);
//AAC
const AUDIO_AAC = {
    mime: 'audio/aac',
};
nodes.push(AUDIO_AAC);
