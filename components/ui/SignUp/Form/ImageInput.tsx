import { ChangeEvent, FunctionComponent, useState } from "react";
import classes from "./ImageInput.module.css";
import PlusIcon from "@ui/Resuable/Icons/PlusIcon";

interface ImageInputProps {
  onImageSelected: (image: Blob) => void;
}

const ImageInput: FunctionComponent<ImageInputProps> = ({
  onImageSelected,
}) => {
  const [image, setImage] = useState("");
  const handleImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target && typeof event.target.result === "string") {
          setImage(event.target.result);
        }
      };
      onImageSelected(e.target.files[0]);
      reader.readAsDataURL(e.target.files[0]);
    }
  };
  return (
    <fieldset className={classes.image_select}>
      <label htmlFor="image">Choose a profile picture</label>
      <div className={classes.image_selector}>
        <input
          type="file"
          id="image"
          accept="image/*"
          onChange={handleImage}
          name="imageSelect"
          hidden
          required
        />
        <label htmlFor="image" className={classes.image_label}>
          {!image && <PlusIcon />}
        </label>
        {image && <img src={image} className={classes.image} />}
      </div>
    </fieldset>
  );
};

export default ImageInput;
