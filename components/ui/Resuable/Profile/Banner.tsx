import ProfileImage from "@ui/Resuable/Profile/ProfileImage/ProfileImage";
import { FunctionComponent } from "react";
import classes from "./Banner.module.css";

interface BannerProps {
  imageUrl: string;
}

const Banner: FunctionComponent<BannerProps> = ({ imageUrl }) => {
  return (
    <div className={classes.banner}>
      <ProfileImage src={imageUrl} className={classes.image} />
    </div>
  );
};

export default Banner;
