import { ChangeEvent, FunctionComponent, useState } from "react";
import classes from "./ImageSelect.module.css";
import ImageIcon from "../Icons/ImageSelect";
import { readImages } from "utils/form";
import { ImageInfo } from "./types";

interface ImageSelectProps {
  setImages: (images: ImageInfo[]) => void;
  images: ImageInfo[];
}

const ImageSelect: FunctionComponent<ImageSelectProps> = ({
  setImages,
  images,
}) => {
  const readImageHandler = async (e: ChangeEvent<HTMLInputElement>) => {
    revokeURLs(images);
    const inputImages = (await readImages(e)) as ImageInfo[];
    setImages(inputImages);
  };
  console.log("CHILD IMAGES", images);
  return (
    <label className={classes.image_select} htmlFor="image">
      <input
        type="file"
        id="image"
        accept="image/*"
        name="imageSelect"
        hidden
        onChange={readImageHandler}
        multiple
      />
      <ImageIcon />
    </label>
  );
};

export const revokeURLs = (images: ImageInfo[]) => {
  images.forEach((image) => {
    URL.revokeObjectURL(image.src);
  });
};

export default ImageSelect;
