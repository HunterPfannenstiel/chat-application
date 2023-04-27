import { FunctionComponent } from "react";
import classes from "./ImageBox.module.css";
import { Image as Images } from "@_types/post";
import Image from "next/image";

interface ImageBoxProps {
  images: Images[] | undefined;
  onClick?: () => void;
}

const ImageBox: FunctionComponent<ImageBoxProps> = ({ images, onClick }) => {
  if (images && images.length > 0) {
    return (
      <ul
        className={`${classes.images} ${
          images.length === 1 ? classes.center : ""
        }`}
      >
        {images.map((image) => {
          return (
            <div
              className={classes.image_container}
              onClick={onClick}
              key={image.imageUrl}
            >
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
  } else return <div className={classes.spacer} />;
};

export default ImageBox;
