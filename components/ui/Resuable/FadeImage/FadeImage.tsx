import { FunctionComponent, useState } from "react";
import classes from "./FadeImage.module.css";
import Image from "next/image";

interface FadeImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
}

const FadeImage: FunctionComponent<FadeImageProps> = ({
  src,
  alt,
  width,
  height,
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  if (src) {
    return (
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        onLoadingComplete={setImageLoaded.bind(null, true)}
        className={imageLoaded ? classes.image_loaded : ""}
      />
    );
  } else return <></>;
};

export default FadeImage;
