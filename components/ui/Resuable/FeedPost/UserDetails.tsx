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
  if (minutesAgo >= 60) {
    const hours = minutesAgo / 60;
    if (hours > 1) {
      return `${hours.toFixed(0)} hours ago`;
    }
    return `${hours.toFixed(0)} hour ago`;
  } else if (minutesAgo >= 10080) {
    const weeks = minutesAgo / 10080;
    if (weeks > 1) {
      return `${weeks.toFixed(0)} weeks ago`;
    }
    return `${weeks.toFixed(0)} week ago`;
  } else if (minutesAgo > 1) {
    return `${minutesAgo.toFixed(0)} minutes ago`;
  }
  return `${minutesAgo.toFixed(0)} minute ago`;
};

export default UserDetails;
