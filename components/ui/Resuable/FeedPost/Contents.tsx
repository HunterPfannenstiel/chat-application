import Image from "next/image";
import { FunctionComponent } from "react";
import classes from "./Contents.module.css";

interface ContentsProps {
  text: string;
  imageUrls?: string[];
}

const Contents: FunctionComponent<ContentsProps> = ({ text, imageUrls }) => {
  return (
    <div>
      <p>{text}</p>
      <div className={classes.images}>
        {imageUrls &&
          imageUrls.map((url) => {
            return <Image src={url} alt="Image" />;
          })}
      </div>
    </div>
  );
};

export default Contents;
