import { FunctionComponent } from "react";
import classes from "./ImageButton.module.css";

interface ImageButtonProps {
  onClick: () => void;
}

const ImageButton: FunctionComponent<ImageButtonProps> = ({ onClick }) => {
  return (
    <svg
      width="34"
      height="34"
      viewBox="0 0 34 34"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onClick={onClick}
    >
      <path
        d="M-7.43094e-07 17C-1.15328e-06 7.616 7.616 -3.32906e-07 17 -7.43094e-07C26.384 -1.15328e-06 34 7.616 34 17C34 26.384 26.384 34 17 34C7.616 34 -3.32906e-07 26.384 -7.43094e-07 17ZM17 15.3L10.2 15.3L10.2 18.7L17 18.7L17 23.8L23.8 17L17 10.2L17 15.3Z"
        fill="#5A3CD2"
      />
    </svg>
  );
};

export default ImageButton;
