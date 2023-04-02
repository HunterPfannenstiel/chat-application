import Image from "next/image";
import { FunctionComponent } from "react";
import classes from "./ProfileImage.module.css";

interface ProfileImageProps {
  src: string;
  alt?: string;
  className?: string;
  circleDiameter?: string;
  onClick?: () => void;
}

const ProfileImage: FunctionComponent<ProfileImageProps> = ({
  src,
  alt,
  className,
  circleDiameter,
  onClick,
}) => {
  return (
    <div
      className={classes.image_container + " " + className}
      style={{ width: circleDiameter, height: circleDiameter }}
      onClick={onClick}
    >
      <Image src={src} alt={alt || "cosmetic"} width={100} height={100} />
    </div>
  );
};

export default ProfileImage;
