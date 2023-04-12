const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

export const uploadImage = (
  buffer: Buffer,
  cb: (imageUrl: string | undefined, publicId: string | undefined) => void
) => {
  const uploadStream = cloudinary.uploader.upload_stream(
    { folder: "profile-images" },
    (err: any, result: any) => {
      if (err) {
        console.log("error", err);
        throw new Error(err.message);
      }
      console.log("Callback result", result);
      cb(result.secure_url, result.public_id);
    }
  );
  return streamifier.createReadStream(buffer).pipe(uploadStream);
};

export const deleteImage = (publicId: string) => {
  cloudinary.uploader.destroy(publicId, (err: any, res: any) => {
    console.log("error delete", err);
    console.log("res delete image", res);
  });
};
