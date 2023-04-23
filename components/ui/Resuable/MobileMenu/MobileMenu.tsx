import { CSSProperties, FunctionComponent, ReactNode } from "react";
import classes from "./MobileMenu.module.css";
import Background from "../Modal/Background";
import CloseIcon from "../Icons/CloseIcon";

interface MobileMenuProps {
  children: ReactNode;
  title?: string;
  backgroundColor?: string;
  showModal: boolean;
  playAnimation: boolean;
  animationTime: number;
  toggleModal: () => void;
}

const MobileMenu: FunctionComponent<MobileMenuProps> = ({
  children,
  title,
  backgroundColor,
  showModal,
  playAnimation,
  toggleModal,
  animationTime,
}) => {
  let className = classes.menu;
  if (playAnimation) {
    className += " " + classes.close;
  } else if (showModal) {
    className += " " + classes.open;
  }
  if (showModal) {
    return (
      <div>
        <Background
          toggle={toggleModal}
          animateOut={playAnimation}
          animationTime={animationTime}
        />
        <section
          className={className}
          style={
            {
              backgroundColor,
              "--animationTime": animationTime + "ms",
            } as CSSProperties
          }
        >
          <CloseIcon onClose={toggleModal} />
          <div className={classes.title}>{title && <h2>{title}</h2>}</div>
          {children}
        </section>
      </div>
    );
  }
  return <></>;
};

export default MobileMenu;
