import { FunctionComponent } from "react";
import classes from "./ImageButtons.module.css";
import ImageButton from "./ImageButton";

interface ImageButtonsProps {
  onClickLeft: () => void;
  onClickRight: () => void;
}

const ImageButtons: FunctionComponent<ImageButtonsProps> = ({
  onClickLeft,
  onClickRight,
}) => {
  return (
    <div className={classes.buttons}>
      <ImageButton onClick={onClickLeft} />
      <ImageButton onClick={onClickRight} />
    </div>
  );
};

export default ImageButtons;
