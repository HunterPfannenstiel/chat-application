import { FunctionComponent } from "react";
import Contents from "./Contents";
import Engagement from "./Engagement/Engagement";
import classes from "./FeedPost.module.css";
import UserDetails from "./UserDetails";
import { FeedPost } from "@_types/post/feed-post";
import { useRouter } from "next/router";

interface FeedPostProps {
  post: FeedPost;
}

const FeedPost: FunctionComponent<FeedPostProps> = ({ post }) => {
  const router = useRouter();
  const viewComments = () => {
    router.push(`/post/${post.postId}`);
  };
  return (
    <div className={classes.feed_post} onClick={viewComments}>
      <div className={classes.user_details}>
        <UserDetails
          imageUrl={post.userImage}
          name={post.userName}
          handle={post.userHandle}
          postedDate={new Date(post.createdOn)}
        />
      </div>
      <div className={classes.content}>
        <Contents text={post.content} images={post.images} />
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
