import { v2 as cloudinary } from "cloudinary";
export default cloudinary;
export interface CloudinaryUploadResult {
    secure_url: string;
    public_id: string;
    [key: string]: any;
}
export declare const uploadToCloudinary: (fileBuffer: Buffer, folder: string) => Promise<CloudinaryUploadResult>;
//# sourceMappingURL=cloudinary.d.ts.map