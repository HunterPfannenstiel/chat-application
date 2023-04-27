import { FunctionComponent } from "react";
import { Image as PostImage } from "@_types/post";
import classes from "./Contents.module.css";
import ImageDisplay from "../PostModal/ImageDisplay";
import ImageBox from "./ImageBox/ImageBox";
import useAnimateModal from "@hooks/animation/useAnimateModal";
import ImageView from "../ImageView/ImageView";

interface ContentsProps {
  text: string;
  images?: PostImage[];
  onClick?: () => void;
  displayImages: (images: any[]) => void;
}

const Contents: FunctionComponent<ContentsProps> = ({
  text,
  images,
  onClick,
  displayImages,
}) => {
  return (
    <div>
      <p onClick={onClick} className={classes.content}>
        {text}
      </p>
      <ImageBox
        images={images}
        onClick={displayImages.bind(null, images || [])}
      />
    </div>
  );
};

export default Contents;
