import { CSSProperties, FunctionComponent } from "react";
import classes from "./LoadingIcon.module.css";

interface LoadingIconProps {
  playAnimation: boolean;
  showLoading: boolean;
  openTime?: number;
  closeTime?: number;
}

const LoadingIcon: FunctionComponent<LoadingIconProps> = ({
  playAnimation,
  showLoading,
  openTime,
  closeTime,
}) => {
  if (!showLoading) return <></>;
  const openVar = (
    openTime ? { "--openTime": openTime + "ms" } : {}
  ) as CSSProperties;
  const closeVar = (
    closeTime ? { "--closeTime": closeTime + "ms" } : {}
  ) as CSSProperties;
  return (
    <div
      className={`${classes.wrapper} ${
        playAnimation ? classes.animate_out : ""
      }`}
      style={{ ...openVar, ...closeVar }}
    >
      <div className={classes.container}>
        <div className={classes.background} />
        <div className={classes.finish_background} />
        <div className={classes.loading_bar} />
        <div className={classes.finish_loader} />
      </div>
    </div>
  );
};

export default LoadingIcon;
