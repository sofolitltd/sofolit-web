import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export const uploadToCloudinary = async (fileUri: string, folder: string = "sofolit") => {
  try {
    const res = await cloudinary.uploader.upload(fileUri, {
      folder,
      resource_type: "auto",
    });
    return res.secure_url;
  } catch (error) {
    console.error("Cloudinary Upload Error:", error);
    throw new Error("Failed to upload image to Cloudinary");
  }
};

/**
 * Deletes an image from Cloudinary using its public ID.
 * @param publicId The public ID of the image (e.g., "sofolit/image_name")
 */
export const deleteFromCloudinary = async (publicId: string) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return result;
  } catch (error) {
    console.error("Cloudinary Delete Error:", error);
    // We don't throw here to avoid blocking DB deletion if Cloudinary fails, 
    // but we log it for admin awareness.
    return { error };
  }
};
