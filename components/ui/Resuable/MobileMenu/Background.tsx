import { FunctionComponent } from "react";
import classes from "./Background.module.css";

interface BackgroundProps {
  toggle: () => void;
  color: string;
  className?: string;
}

const Background: FunctionComponent<BackgroundProps> = ({
  toggle,
  color,
  className,
}) => {
  return (
    <div
      className={classes.background + " " + className}
      style={{ backgroundColor: color }}
      onClick={toggle}
    />
  );
};

export default Background;
