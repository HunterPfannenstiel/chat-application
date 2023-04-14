const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

export const uploadImage = (
  buffer: Buffer
): Promise<{ url: string; publicId: string }> => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: "profile-images" },
      (err: any, result: any) => {
        if (err) {
          console.log("error", err);
          reject(new Error(err.message));
        }
        console.log("Callback result", result);
        resolve({ url: result.secure_url, publicId: result.public_id });
      }
    );
    streamifier.createReadStream(buffer).pipe(uploadStream);
  });
};

export const deleteImage = (publicId: string) => {
  cloudinary.uploader.destroy(publicId, (err: any, res: any) => {
    console.log("ERROR", err);
    console.log("res delete image", res);
  });
};

export const parseImage = () => {};
