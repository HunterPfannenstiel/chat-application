import { FunctionComponent } from "react";
import classes from "./CloseIcon.module.css";

interface CloseIconProps {
  diameter?: number;
  className?: string;
  onClose?: () => void;
  displayOnDesktop?: boolean;
}

const CloseIcon: FunctionComponent<CloseIconProps> = ({
  diameter,
  className,
  onClose,
  displayOnDesktop,
}) => {
  let classN = `${classes.close_button} ${
    !!!displayOnDesktop ? classes.hide : ""
  } ${className ? className : ""}`;
  return (
    <div className={classN}>
      <div className={classes.container} onClick={onClose}>
        <div />
        <div />
      </div>
    </div>
  );
};

export default CloseIcon;
