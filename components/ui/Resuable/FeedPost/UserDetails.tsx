import Link from "next/link";
import { FunctionComponent } from "react";
import ProfileImage from "../Profile/ProfileImage/ProfileImage";
import classes from "./UserDetails.module.css";

interface UserDetailsProps {
  imageUrl: string;
  name: string;
  handle: string;
}

const UserDetails: FunctionComponent<UserDetailsProps> = ({
  imageUrl,
  name,
  handle,
}) => {
  return (
    <div className={classes.user_details}>
      <Link href={`/${handle}`}>
        <ProfileImage src={imageUrl} className={classes.image} />
      </Link>
      <div className={classes.names}>
        <p>{name}</p>
        <p>{`@${handle}`}</p>
      </div>
    </div>
  );
};

export default UserDetails;
