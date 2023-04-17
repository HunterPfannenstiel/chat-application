import { FunctionComponent } from "react";
import classes from "./CloseIcon.module.css";

interface CloseIconProps {
  diameter?: number;
  className?: string;
  onClose: () => void;
}

const CloseIcon: FunctionComponent<CloseIconProps> = ({
  diameter,
  className,
  onClose,
}) => {
  return (
    <div className={classes.container} onClick={onClose}>
      <div />
      <div />
    </div>
  );
};

export default CloseIcon;
