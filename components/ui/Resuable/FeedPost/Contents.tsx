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
}

const Contents: FunctionComponent<ContentsProps> = ({
  text,
  images,
  onClick,
}) => {
  const { showModal, playAnimation, toggle } = useAnimateModal(300);
  return (
    <div>
      <p onClick={onClick}>{text}</p>
      <ImageBox images={images} onClick={toggle} />
      {/* <ImageDisplay onSelectImage={() => {}} images={images} /> */}
      {showModal && (
        <ImageView
          images={images || []}
          modalProps={{ playAnimation, toggle, animationTime: 300 }}
        />
      )}
    </div>
  );
};

export default Contents;
