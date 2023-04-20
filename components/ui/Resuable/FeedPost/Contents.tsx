import { FunctionComponent } from "react";
import { Image as PostImage } from "@_types/post";
import classes from "./Contents.module.css";
import ImageDisplay from "../PostModal/ImageDisplay";

interface ContentsProps {
  text: string;
  images?: PostImage[];
}

const Contents: FunctionComponent<ContentsProps> = ({ text, images }) => {
  return (
    <div>
      <p>{text}</p>
      <ImageDisplay onSelectImage={() => {}} images={images} />
    </div>
  );
};

export default Contents;
