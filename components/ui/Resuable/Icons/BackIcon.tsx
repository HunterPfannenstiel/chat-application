import { FunctionComponent } from "react";
import classes from "./BackIcon.module.css";

interface BackIconProps {
  onClick?: () => void;
}

const BackIcon: FunctionComponent<BackIconProps> = ({ onClick }) => {
  return (
    <svg
      width="30"
      height="30"
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onClick={onClick}
      className={classes.back}
    >
      <path
        d="M30 15C30 23.2843 23.2843 30 15 30C6.71573 30 0 23.2843 0 15C0 6.71573 6.71573 0 15 0C23.2843 0 30 6.71573 30 15Z"
        fill="#5A3CD2"
      />
      <path
        d="M12.75 11L9 14.5M9 14.5H21M9 14.5L12.75 18"
        stroke="white"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export default BackIcon;
