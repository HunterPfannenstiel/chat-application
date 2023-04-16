import { FunctionComponent } from "react";
import classes from "./ImageDisplay.module.css";
import Image from "next/image";
import { ImageInfo } from "./types";

interface ImageDisplayProps {
  images: ImageInfo[];
  removeImage: (url: string) => void;
}

const ImageDisplay: FunctionComponent<ImageDisplayProps> = ({
  images,
  removeImage,
}) => {
  const containerPercentage = (1 / images.length) * 100;
  return (
    <div className={classes.images}>
      {images.map((image) => (
        <div
          className={classes.image_container}
          style={{
            width: containerPercentage + "%",
            height: containerPercentage + "%",
          }}
        >
          <div
            onClick={removeImage.bind(null, image.src)}
            className={classes.close}
          >
            x
          </div>
          <Image
            src={image.src}
            alt="user image"
            width={image.width}
            height={image.height}
          />
        </div>
      ))}
    </div>
  );
};

export default ImageDisplay;
