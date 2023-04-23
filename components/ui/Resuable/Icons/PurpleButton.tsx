import { FunctionComponent, HTMLAttributes, ReactNode } from "react";
import classes from "./PurpleButton.module.css";

interface PurpleButtonProps extends HTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
}

const PurpleButton: FunctionComponent<PurpleButtonProps> = ({
  children,
  className,
  ...rest
}) => {
  return (
    <button {...rest} className={className + " " + classes.button}>
      {children}
    </button>
  );
};

export default PurpleButton;
