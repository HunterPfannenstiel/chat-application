import { CSSProperties, FunctionComponent, ReactNode } from "react";
import classes from "./Modal.module.css";
import Background from "./Background";
import CloseIcon from "../Icons/CloseIcon";

interface ModalProps {
  children: ReactNode;
  className: string;
  toggle: () => void;
  playAnimation: boolean;
  animationTime: number;
  displayCloseIcon?: boolean;
}

const Modal: FunctionComponent<ModalProps> = ({
  children,
  className,
  toggle,
  playAnimation,
  animationTime,
  displayCloseIcon,
}) => {
  if (playAnimation) {
    className += ` ${classes.animate}`;
  }
  return (
    <div>
      <Background
        toggle={toggle}
        animateOut={playAnimation}
        animationTime={animationTime}
      />
      <section
        className={classes.modal + " " + className}
        style={{ "--animationTime": animationTime + "ms" } as CSSProperties}
      >
        {displayCloseIcon && (
          <div className={classes.close_button}>
            <CloseIcon onClose={toggle} />
          </div>
        )}
        {children}
      </section>
    </div>
  );
};

export default Modal;
