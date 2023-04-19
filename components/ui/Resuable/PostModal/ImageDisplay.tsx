import { FunctionComponent } from "react";
import type { Image as Images } from "@_types/post";
import classes from "./ImageDisplay.module.css";
import Image from "next/image";
import { ImageInfo } from "./types";

interface ImageDisplayProps {
  inputImages: ImageInfo[];
  initialImages?: Images[];
  onSelectImage: (index: number) => void;
}

const ImageDisplay: FunctionComponent<ImageDisplayProps> = ({
  inputImages,
  initialImages,
  onSelectImage,
}) => {
  const images =
    inputImages.length > 0 ? inputImages : initialImages ? initialImages : [];
  const containerPercentage = (1 / images.length) * 100;
  return (
    <div className={classes.images}>
      {images.map((image, i) => (
        <div
          className={classes.image_container}
          style={{
            width: containerPercentage + "%",
            height: containerPercentage + "%",
          }}
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
    </div>
  );
};

export default ImageDisplay;
