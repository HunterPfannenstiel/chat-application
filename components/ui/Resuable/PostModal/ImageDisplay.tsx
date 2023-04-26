import { FunctionComponent } from "react";
import type { Image as Images } from "@_types/post";
import classes from "./ImageDisplay.module.css";
import Image from "next/image";
import { ImageInfo } from "./types";
import CloseIcon from "../Icons/CloseIcon";

interface ImageDisplayProps {
  images?: Images[];
  onSelectImage: (index: number) => void;
  displayRemove?: boolean;
  onRemoveImages?: () => void;
}

const ImageDisplay: FunctionComponent<ImageDisplayProps> = ({
  images = [],
  onSelectImage,
  displayRemove,
  onRemoveImages,
}) => {
  return (
    <ul className={classes.images}>
      {displayRemove && <CloseIcon onClose={onRemoveImages} displayOnDesktop />}
      {images.map((image, i) => (
        <div
          className={classes.image_container}
          onClick={onSelectImage.bind(null, i)}
          key={image.imageUrl}
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
