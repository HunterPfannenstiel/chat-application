import { FunctionComponent } from "react";
import classes from "./ImageBox.module.css";
import { Image as Images } from "@_types/post";
import Image from "next/image";

interface ImageBoxProps {
  images: Images[] | undefined;
}

const ImageBox: FunctionComponent<ImageBoxProps> = ({ images }) => {
  return (
    <ul className={classes.images}>
      {images?.map((image) => {
        return (
          <div className={classes.image_container}>
            <Image
              src={image.imageUrl}
              alt="post image"
              width={200}
              height={200}
            />
          </div>
        );
      })}
    </ul>
  );
};

export default ImageBox;
