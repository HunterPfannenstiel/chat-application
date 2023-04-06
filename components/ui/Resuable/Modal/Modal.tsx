import { CSSProperties, FunctionComponent, ReactNode } from "react";
import classes from "./Modal.module.css";
import Background from "../MobileMenu/Background";

interface ModalProps {
  children: ReactNode;
  className: string;
  toggle: () => void;
  playAnimation: boolean;
  animationTime: number;
}

const Modal: FunctionComponent<ModalProps> = ({
  children,
  className,
  toggle,
  playAnimation,
  animationTime,
}) => {
  if (playAnimation) {
    className += ` ${classes.animate}`;
  }
  return (
    <>
      <div
        className={classes.modal + " " + className}
        style={{ "--animationTime": animationTime + "ms" } as CSSProperties}
      >
        {children}
      </div>
      <Background
        toggle={toggle}
        animateOut={playAnimation}
        animationTime={animationTime}
      />
    </>
  );
};

export default Modal;
