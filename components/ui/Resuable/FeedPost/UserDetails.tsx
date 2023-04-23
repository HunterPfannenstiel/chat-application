import Link from "next/link";
import { FunctionComponent } from "react";
import ProfileImage from "../Profile/ProfileImage/ProfileImage";
import classes from "./UserDetails.module.css";

interface UserDetailsProps {
  imageUrl: string;
  name: string;
  handle: string;
  postedDate?: Date;
}

const UserDetails: FunctionComponent<UserDetailsProps> = ({
  imageUrl,
  name,
  handle,
  postedDate,
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
      {postedDate && (
        <p className={classes.date}>{getRelativeTime(postedDate)}</p>
      )}
    </div>
  );
};

const getRelativeTime = (date: Date) => {
  const minutesAgo = (new Date().getTime() - date.getTime()) / 60000;
  if (minutesAgo >= 10080) {
    const weeks = minutesAgo / 10080;
    return `${weeks.toFixed(0)}w ago`;
  } else if (minutesAgo >= 1440) {
    const days = minutesAgo / 1440;
    return `${days.toFixed(0)}d ago`;
  } else if (minutesAgo >= 60) {
    const hours = minutesAgo / 60;
    return `${hours.toFixed(0)}h ago`;
  }
  return `${minutesAgo.toFixed(0)}m ago`;
};

export default UserDetails;
