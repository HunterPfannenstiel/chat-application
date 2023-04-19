import { FunctionComponent } from "react";
import classes from "./EditButton.module.css";

interface EditButtonProps {
  onClick?: () => void;
}

const EditButton: FunctionComponent<EditButtonProps> = ({ onClick }) => {
  return (
    <button onClick={onClick} className={classes.button}>
      Edit
    </button>
  );
};

export default EditButton;
