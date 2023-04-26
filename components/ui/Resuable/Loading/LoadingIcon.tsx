import { FunctionComponent } from "react";
import classes from "./LoadingIcon.module.css";

interface LoadingIconProps {
  playAnimation: boolean;
  showLoading: boolean;
}

const LoadingIcon: FunctionComponent<LoadingIconProps> = ({
  playAnimation,
  showLoading,
}) => {
  if (!showLoading) return <></>;
  return (
    <div
      className={`${classes.loading} ${
        playAnimation ? classes.animate_out : ""
      }`}
    />
  );
};

export default LoadingIcon;
