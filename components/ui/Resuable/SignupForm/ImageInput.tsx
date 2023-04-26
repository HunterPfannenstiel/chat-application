import { ChangeEvent, FunctionComponent } from "react";
import classes from "./ImageInput.module.css";
import PlusIcon from "@ui/Resuable/Icons/PlusIcon";
import AddImageIcon from "../Icons/AddImageIcon";

interface ImageInputProps {
  onImageSelected: (image: { blob: Blob; imageUrl: string }) => void;
  imageUrl?: string;
}

const ImageInput: FunctionComponent<ImageInputProps> = ({
  onImageSelected,
  imageUrl,
}) => {
  const handleImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const blob = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target && typeof event.target.result === "string") {
          onImageSelected({
            blob,
            imageUrl: event.target.result,
          });
        }
      };

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
          required={imageUrl ? false : true}
        />

        <label htmlFor="image" className={classes.image_label}>
          {/*<PlusIcon style={{ opacity: imageUrl ? 0 : 1 }} />*/}
          <div className={`${classes.icon} ${imageUrl ? "" : classes.display}`}>
            <AddImageIcon />
          </div>
        </label>
        {imageUrl && <img src={imageUrl} className={classes.image} />}
      </div>
    </fieldset>
  );
};

export default ImageInput;
