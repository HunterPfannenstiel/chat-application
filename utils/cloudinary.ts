const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

export const uploadImage = (
  buffer: Buffer,
  includeAspect?: boolean
): Promise<{ imageUrl: string; publicId: string; aspectRatio?: number }> => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: "profile-images" },
      (err: any, result: any) => {
        if (err) {
          console.log("error", err);
          reject(new Error(err.message));
        }
        console.log("Callback result", result);
        if (includeAspect) {
          resolve({
            imageUrl: result.secure_url,
            publicId: result.public_id,
            aspectRatio: result.width / result.height,
          });
        }
        resolve({ imageUrl: result.secure_url, publicId: result.public_id });
      }
    );
    streamifier.createReadStream(buffer).pipe(uploadStream);
  });
};

export const uploadManyImages = async (buffers: Buffer[]) => {
  const promises = buffers.map((buffer) => uploadImage(buffer, true));
  const images = await Promise.all(promises);

  return images;
};

export const deleteImage = (publicId: string) => {
  cloudinary.uploader.destroy(publicId, (err: any, res: any) => {
    console.log("ERROR", err);
    console.log("res delete image", res);
  });
};

export const parseImage = () => {};
