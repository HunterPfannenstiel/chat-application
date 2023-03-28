import Image from "next/image";
import { FunctionComponent } from "react";
import classes from "./ProfileImage.module.css";

interface ProfileImageProps {
  src: string;
  alt?: string;
  className?: string;
}

const ProfileImage: FunctionComponent<ProfileImageProps> = ({
  src,
  alt,
  className,
}) => {
  return (
    <div className={classes.image_container + " " + className}>
      <Image src={src} alt={alt || "cosmetic"} width={100} height={200} />
    </div>
  );
};

export default ProfileImage;
