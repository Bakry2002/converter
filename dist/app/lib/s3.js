"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.key = void 0;
// Key function: this function will generate a key for the file in s3
const key = (c, n, a) => `${c.id}/${n}/${a.id}`;
exports.key = key;
