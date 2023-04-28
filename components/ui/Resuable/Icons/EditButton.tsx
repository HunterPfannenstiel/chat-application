import { FunctionComponent } from "react";
import classes from "./EditButton.module.css";

interface EditButtonProps {
  onClick?: () => void;
  className?: string;
  userId?: number;
}

const EditButton: FunctionComponent<EditButtonProps> = ({
  onClick,
  className,
  userId,
}) => {
  if (userId === 0) {
    return <div style={{ paddingTop: "2rem" }} />;
  }
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      onClick={onClick}
      className={className}
    >
      <path
        d="M9.91565 5.18592L8.81408 4.08435L1.55808 11.3404V12.4419H2.65965L9.91565 5.18592ZM11.0172 4.08435L12.1188 2.98279L11.0172 1.88122L9.91565 2.98279L11.0172 4.08435ZM3.3047 14H0V10.6945L10.4664 0.228093C10.6125 0.0820452 10.8106 0 11.0172 0C11.2238 0 11.4219 0.0820452 11.568 0.228093L13.7719 2.432C13.918 2.5781 14 2.77621 14 2.98279C14 3.18936 13.918 3.38748 13.7719 3.53357L3.3047 14Z"
        fill="#5A3CD2"
      />
    </svg>
  );
};

export default EditButton;
