import { CSSProperties, FunctionComponent } from "react";
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
  displayImages: (images: any[]) => void;
}

const FeedPost: FunctionComponent<FeedPostProps> = ({
  post,
  isUsersPost,
  onEditPost,
  userDetails,
  displayImages,
}) => {
  const router = useRouter();
  const viewComments = () => {
    router.push(`/post/${post.postId}`);
  };
  return (
    <div className={classes.feed_post}>
      <div className={classes.user_details}>
        <UserDetails
          imageUrl={userDetails?.userImage || post.userImage}
          name={post.userName || userDetails?.userName || ""}
          handle={post.userHandle || userDetails?.userHandle || ""}
          postedDate={new Date(post.createdOn)}
        />
      </div>
      <div className={classes.content}>
        <Contents
          text={post.content}
          images={post.images}
          onClick={viewComments}
          displayImages={displayImages}
        />
        <Engagement
          likeCount={post.likeCount}
          commentCount={post.commentCount}
          isLiked={post.isLiked == 1}
          postId={post.postId}
          isUsersProfile={isUsersPost}
          editPost={onEditPost}
          replyToPostId={post.replyToPostId}
        />
      </div>
    </div>
  );
};

export default FeedPost;
