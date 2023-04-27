import { FunctionComponent, useState } from "react";
import classes from "./ImageView.module.css";
import { Image as ImageProp } from "@_types/post";
import Modal from "../Modal/Modal";
import { ModalProps } from "@_types/ui";
import Image from "next/image";
import ImageButtons from "../Icons/ImageButtons/ImageButtons";
import FadeImage from "../FadeImage/FadeImage";

interface ImageViewProps {
  images: ImageProp[];
  modalProps: ModalProps;
  initialIndex?: number;
}

const ImageView: FunctionComponent<ImageViewProps> = ({
  images,
  modalProps,
  initialIndex,
}) => {
  const [currImage, setCurrImage] = useState(initialIndex || 0);
  const handleNextImage = (direction: "left" | "right") => {
    switch (direction) {
      case "left":
        if (currImage === 0) setCurrImage(images.length - 1);
        else setCurrImage((prevState) => prevState - 1);
        break;
      case "right":
        if (currImage === images.length - 1) setCurrImage(0);
        else setCurrImage((prevState) => prevState + 1);
        break;
    }
  };
  return (
    <Modal {...modalProps} className={classes.modal} displayCloseIcon>
      <p>
        Images:{" "}
        <span>
          {currImage + 1}/{images.length}
        </span>
      </p>
      <div className={classes.image_container}>
        <FadeImage
          src={images[currImage].imageUrl}
          alt="Post Image"
          width={500}
          height={500}
        />
      </div>
      {images.length > 1 && (
        <ImageButtons
          onClickLeft={handleNextImage.bind(null, "left")}
          onClickRight={handleNextImage.bind(null, "right")}
        />
      )}
    </Modal>
  );
};

export default ImageView;
