import { ChangeEvent } from "react";

export const formHandler = (data: { [p: string]: any }) => {
  const formData = new FormData();
  Object.keys(data).forEach((key) => {
    formData.append(key, data[key]);
  });
  return formData;
};

export const readImages = async (e: ChangeEvent<HTMLInputElement>) => {
  if (e.target.files) {
    const promises = [];
    for (let i = 0; i < e.target.files.length; i++) {
      promises.push(
        new Promise((resolve, reject) => {
          const img = new Image();
          img.src = URL.createObjectURL(e.target.files![i]);
          img.onload = () => {
            resolve({
              src: img.src,
              width: img.width,
              height: img.height,
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
