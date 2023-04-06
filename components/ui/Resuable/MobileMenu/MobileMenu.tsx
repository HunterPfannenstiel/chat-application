import { CSSProperties, FunctionComponent, ReactNode } from "react";
import classes from "./MobileMenu.module.css";
import Background from "./Background";

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
      <>
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
          <div className={classes.title}>
            {title && <h2>{title}</h2>}
            <p onClick={toggleModal}>X</p>
          </div>
          {children}
        </section>
      </>
    );
  }
  return <></>;
};

export default MobileMenu;
