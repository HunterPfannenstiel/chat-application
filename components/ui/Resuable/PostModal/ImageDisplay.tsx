import { FunctionComponent } from "react";
import type { Image as Images } from "@_types/post";
import classes from "./ImageDisplay.module.css";
import Image from "next/image";
import { ImageInfo } from "./types";

interface ImageDisplayProps {
  images?: Images[];
  onSelectImage: (index: number) => void;
}

const ImageDisplay: FunctionComponent<ImageDisplayProps> = ({
  images = [],
  onSelectImage,
}) => {
  return (
    <ul className={classes.images}>
      {images.map((image, i) => (
        <div
          className={classes.image_container}
          onClick={onSelectImage.bind(null, i)}
        >
          <Image
            src={image.imageUrl}
            alt="user image"
            width={200}
            height={200}
          />
        </div>
      ))}
    </ul>
  );
};

export default ImageDisplay;
