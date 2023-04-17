import { FunctionComponent } from "react";
import classes from "./ImageDisplay.module.css";
import Image from "next/image";
import { ImageInfo } from "./types";

interface ImageDisplayProps {
  images: ImageInfo[];
  onSelectImage: (index: number) => void;
}

const ImageDisplay: FunctionComponent<ImageDisplayProps> = ({
  images,
  onSelectImage,
}) => {
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
