import { FunctionComponent, useState } from "react";
import classes from "./ImageView.module.css";
import { Image as ImageProp } from "@_types/post";
import Modal from "../Modal/Modal";
import { ModalProps } from "@_types/ui";
import Image from "next/image";

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
      <div
        className={classes.image_container}
        style={{ aspectRatio: images[currImage].aspectRatio }}
      >
        <Image
          src={images[currImage].imageUrl}
          alt="Post Image"
          width={500}
          height={500}
        />
      </div>
      <div className={classes.image_buttons}>
        <button onClick={handleNextImage.bind(null, "left")}>{"<"}</button>
        <button onClick={handleNextImage.bind(null, "right")}>{">"}</button>
      </div>
    </Modal>
  );
};

export default ImageView;
