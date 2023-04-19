import { FeedPost as FeedPostT } from "@_types/post/feed-post";
import { FunctionComponent, ReactNode } from "react";
import FeedPost from "../FeedPost";
import classes from "./index.module.css";

interface FeedPostListProps {
  posts: FeedPostT[] | undefined;
  emptyPostDisplay: ReactNode;
  isUsersFeed?: boolean;
  onEditPost?: (index: number) => void;
}

const FeedPostList: FunctionComponent<FeedPostListProps> = ({
  posts,
  emptyPostDisplay,
  isUsersFeed,
  onEditPost,
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
            />
          );
        })}
      </ul>
    );
  }
  return <>{emptyPostDisplay}</>;
};

export default FeedPostList;
