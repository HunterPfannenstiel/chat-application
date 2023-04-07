import { FunctionComponent } from "react";
import Contents from "./Contents";
import Engagement from "./Engagement/Engagement";
import classes from "./FeedPost.module.css";
import UserDetails from "./UserDetails";

interface FeedPostProps {
  userImage: string;
  username: string;
  userHandle: string;
  postContent: string;
  postImages?: string[];
  likes: number;
  comments: number;
}

const FeedPost: FunctionComponent<FeedPostProps> = ({
  userHandle,
  userImage,
  username,
  postContent,
  postImages,
  likes,
  comments,
}) => {
  return (
    <div className={classes.feed_post}>
      <div className={classes.user_details}>
        <UserDetails imageUrl={userImage} name={username} handle={userHandle} />
      </div>
      <div className={classes.content}>
        <Contents text={postContent} imageUrls={postImages} />
        <Engagement likeCount={likes} commentCount={comments} />
      </div>
    </div>
  );
};

export default FeedPost;