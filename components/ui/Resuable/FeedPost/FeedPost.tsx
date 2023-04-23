import { FunctionComponent } from "react";
import Contents from "./Contents";
import Engagement from "./Engagement/Engagement";
import classes from "./FeedPost.module.css";
import UserDetails from "./UserDetails";
import { FeedPost } from "@_types/post/feed-post";
import { useRouter } from "next/router";
import EditButton from "../Icons/EditButton";
import { UserInfo } from "@_types/user";

interface FeedPostProps {
  post: FeedPost;
  isUsersPost?: boolean;
  onEditPost?: () => void;
  userDetails?: UserInfo;
}

const FeedPost: FunctionComponent<FeedPostProps> = ({
  post,
  isUsersPost,
  onEditPost,
  userDetails,
}) => {
  const router = useRouter();
  const viewComments = () => {
    router.push(`/post/${post.postId}`);
  };
  return (
    <div className={classes.feed_post}>
      {isUsersPost && <EditButton onClick={onEditPost} />}
      <div className={classes.user_details}>
        <UserDetails
          imageUrl={userDetails?.userImage || post.userImage}
          name={userDetails?.userName || post.userName}
          handle={userDetails?.userHandle || post.userHandle}
          postedDate={new Date(post.createdOn)}
        />
      </div>
      <div className={classes.content}>
        <Contents
          text={post.content}
          images={post.images}
          onClick={viewComments}
        />
        <Engagement
          likeCount={post.likeCount}
          commentCount={post.commentCount}
          isLiked={post.isLiked == 1}
          postId={post.postId}
        />
      </div>
    </div>
  );
};

export default FeedPost;
