import { ImageInfo } from "@ui/Resuable/PostModal/types";
import { ChangeEvent } from "react";

export const createFormData = (
  data: { [p: string]: any },
  arrayData?: { [p: string]: Array<any> }
) => {
  const formData = new FormData();
  Object.keys(data).forEach((key) => {
    formData.append(key, data[key]);
  });
  if (arrayData) {
    Object.keys(arrayData).forEach((key) => {
      arrayData[key].forEach((item) => {
        formData.append(key, item);
      });
    });
  }
  return formData;
};

export const readImages = async (
  e: ChangeEvent<HTMLInputElement>
): Promise<ImageInfo[]> => {
  if (e.target.files) {
    const promises: Promise<ImageInfo>[] = [];
    for (let i = 0; i < Math.min(e.target.files.length, 4); i++) {
      promises.push(
        new Promise((resolve, reject) => {
          const img = new Image();
          img.src = URL.createObjectURL(e.target.files![i]);
          img.onload = () => {
            resolve({
              imageUrl: img.src,
              aspectRatio: img.width / img.height,
              blob: e.target.files![i],
            });
          };
        })
      );
    }
    const images = await Promise.all(promises);
    return images;
  }
  return [];
};

export const revokeURLs = (images: ImageInfo[]) => {
  images.forEach((image) => {
    if (image.blob) {
      URL.revokeObjectURL(image.imageUrl);
    }
  });
};
