"use strict";
//* ========== Note ==============
// this is the background converter that will be hosted away from the app directory as
// next.js does not support long-running processes
// To make it work asynchronously with the app, we will need to:
//      1. Compile the typescript code to javascript.
//      2. turn it to an executable with docker.
//* ========== End Note ===========
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const AWS = __importStar(require("aws-sdk"));
const prisma_1 = require("../app/lib/prisma");
// import { PNG_TO_JPG } from './converters/image'
const crypto_1 = require("crypto");
const mime_types_1 = require("mime-types");
const graph_1 = require("./graph");
AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_DEFAULT_REGION,
});
const bucket = process.env.AWS_S3_BUCKET_NAME;
//! Convert function: all the work will be done here
const convert = async (c) => {
    try {
        const s3 = new AWS.S3();
        const downloadParams = {
            Bucket: bucket,
            Key: c.s3Key,
        };
        console.log('Downloading file:', downloadParams);
        const res = await s3.getObject(downloadParams).promise();
        const converters = (0, graph_1.findPath)(c.fromMime, c.toMime);
        if (!converters) {
            console.error(`Could not find a converters for ${c.fromMime} to ${c.toMime}`);
            await prisma_1.prisma.conversion.update({
                where: {
                    id: c.id,
                },
                data: {
                    error: `Could not convert from ${c.fromMime} to ${c.toMime}`,
                    status: client_1.ConversionStatus.ERROR,
                },
            });
            return;
        }
        // otherwise, we will have a path of converters and we need to loop over them
        let converted = res.Body; // this is the file we will convert
        for (const edge of converters) {
            converted = await edge.converter(res.Body); // convert the file
        }
        console.log('Convert', converters[converters.length - 1].to.type);
        const mime = (0, mime_types_1.extension)(converters[converters.length - 1].to.type); // get the mime type of the last converter as it will be the required mime type to
        const key = ((0, crypto_1.randomUUID)() + (0, crypto_1.randomUUID)()).replace(/-/g, ''); //  create a new random key for the file after it has been converted
        console.log('Uploading to:', key);
        const uploadParams = {
            Bucket: bucket,
            Key: key,
            Body: converted,
        };
        await s3.putObject(uploadParams).promise();
        await prisma_1.prisma.conversion.update({
            where: {
                id: c.id,
            },
            data: {
                status: client_1.ConversionStatus.DONE,
                s3Key: key,
                currentMime: mime,
            },
        });
        //! RECAP: we have downloaded the file from s3, converted it, and uploaded it back to s3, and then update the database
    }
    catch (error) {
        await prisma_1.prisma.conversion.update({
            where: {
                id: c.id,
            },
            data: {
                status: client_1.ConversionStatus.ERROR,
                error: `Could not convert: ${error.message}`,
            },
        });
    }
};
const main = async () => {
    // pull in the conversion from the database that need to be converted
    const conversions = await prisma_1.prisma.conversion.findMany({
        where: {
            status: client_1.ConversionStatus.PENDING,
        },
    });
    console.log(`Found ${conversions.length} conversions`);
    // map over the conversions
    for (const conversion of conversions) {
        await convert(conversion);
    }
};
// we will create a function that check for new conversion every second
const loop = async () => {
    while (true) {
        await main();
        await new Promise((resolve) => setTimeout(resolve, 1000));
    }
};
loop();
