"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.key = exports.s3 = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
exports.s3 = new client_s3_1.S3({
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
    region: process.env.AWS_DEFAULT_REGION,
});
// Key function: this function will generate a key for the file in s3
const key = (c, n, a) => `/${c.id}/${n}/${a.id}`;
exports.key = key;
