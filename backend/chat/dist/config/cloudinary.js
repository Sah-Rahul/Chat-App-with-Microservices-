import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
dotenv.config();
const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = process.env;
if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_API_KEY || !CLOUDINARY_API_SECRET) {
    throw new Error("Missing Cloudinary environment variables");
}
cloudinary.config({
    cloud_name: CLOUDINARY_CLOUD_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET,
});
export default cloudinary;
export const uploadToCloudinary = (fileBuffer, folder) => new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream({ folder }, (err, result) => {
        if (err || !result)
            return reject(err);
        resolve(result);
    });
    stream.end(fileBuffer);
});
//# sourceMappingURL=cloudinary.js.map