"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cloudinary = require('cloudinary').v2;
const dotenv = require("dotenv");
dotenv.config({ path: './config.env' });
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET_KEY
});
exports.default = cloudinary;
//# sourceMappingURL=cloudinary.js.map