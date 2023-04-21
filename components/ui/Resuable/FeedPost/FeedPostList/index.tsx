import { FeedPost as FeedPostT } from "@_types/post/feed-post";
import { FunctionComponent, ReactNode } from "react";
import FeedPost from "../FeedPost";
import classes from "./index.module.css";
import { UserInfo } from "@_types/user";

interface FeedPostListProps {
  posts: FeedPostT[] | undefined;
  emptyPostDisplay: ReactNode;
  isUsersFeed?: boolean;
  onEditPost?: (index: number) => void;
  userDetails?: UserInfo;
}

const FeedPostList: FunctionComponent<FeedPostListProps> = ({
  posts,
  emptyPostDisplay,
  isUsersFeed,
  onEditPost,
  userDetails,
}) => {
  if (posts) {
    return (
      <ul className={classes.posts}>
        {posts.map((post, i) => {
          return (
            <FeedPost
              post={post}
              isUsersPost={isUsersFeed}
              onEditPost={onEditPost?.bind(null, i)}
              userDetails={userDetails}
            />
          );
        })}
      </ul>
    );
  }
  return <>{emptyPostDisplay}</>;
};

export default FeedPostList;
