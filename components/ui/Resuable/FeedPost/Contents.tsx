import Image from "next/image";
import { FunctionComponent } from "react";
import { Image as PostImage } from "@_types/post";
import classes from "./Contents.module.css";

interface ContentsProps {
  text: string;
  images?: PostImage[];
}

const Contents: FunctionComponent<ContentsProps> = ({ text, images }) => {
  return (
    <div>
      <p>{text}</p>
      <div className={classes.images}>
        {images &&
          images.map((image) => {
            return <Image src={image.imageUrl} alt="Image" />;
          })}
      </div>
    </div>
  );
};

export default Contents;
