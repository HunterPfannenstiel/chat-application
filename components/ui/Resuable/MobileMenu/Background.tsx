import { CSSProperties, FunctionComponent } from "react";
import classes from "./Background.module.css";

interface BackgroundProps {
  toggle: () => void;
  color?: string;
  className?: string;
  animateOut: boolean;
  animationTime: number;
}

const Background: FunctionComponent<BackgroundProps> = ({
  toggle,
  color,
  className,
  animateOut,
  animationTime,
}) => {
  if (animateOut) {
    className += ` ${classes.animate_out}`;
  }

  return (
    <div
      className={classes.background + " " + className}
      style={
        {
          backgroundColor: color,
          "--animationTime": animationTime + "ms",
        } as CSSProperties
      }
      onClick={toggle}
    />
  );
};

export default Background;
