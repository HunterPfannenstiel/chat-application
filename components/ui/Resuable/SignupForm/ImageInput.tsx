import {
  ChangeEvent,
  FunctionComponent,
  useEffect,
  useRef,
  useState,
} from "react";
import classes from "./ImageInput.module.css";
import PlusIcon from "@ui/Resuable/Icons/PlusIcon";

interface ImageInputProps {
  onImageSelected: (image: Blob) => void;
  initialImage?: string;
}

const ImageInput: FunctionComponent<ImageInputProps> = ({
  onImageSelected,
  initialImage,
}) => {
  const [image, setImage] = useState(initialImage);

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
      <label htmlFor="image" className={classes.image_label}>
        Choose a profile picture
      </label>
      <div className={classes.image_selector}>
        <input
          type="file"
          id="image"
          accept="image/*"
          onChange={handleImage}
          name="imageSelect"
          hidden
          required={initialImage ? false : true}
        />
        <label htmlFor="image" className={classes.image_label}>
          <PlusIcon style={{ opacity: image ? 0 : 1 }} />
        </label>
        {image && <img src={image} className={classes.image} />}
      </div>
    </fieldset>
  );
};

export default ImageInput;
