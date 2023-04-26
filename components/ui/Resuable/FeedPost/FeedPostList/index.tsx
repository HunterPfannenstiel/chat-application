import { FeedPost as FeedPostT } from "@_types/post/feed-post";
import { FunctionComponent, ReactNode, RefObject } from "react";
import FeedPost from "../FeedPost";
import classes from "./index.module.css";
import { UserInfo } from "@_types/user";
import { SetScrollEvent } from "@hooks/page-fetch/types";

interface FeedPostListProps {
  posts: FeedPostT[] | undefined;
  emptyPostDisplay: ReactNode;
  isUsersFeed?: boolean;
  onEditPost?: (index: number) => void;
  userDetails?: UserInfo;
  setScrollEvent?: SetScrollEvent;
  scroll?: boolean;
}

const FeedPostList: FunctionComponent<FeedPostListProps> = ({
  posts,
  emptyPostDisplay,
  isUsersFeed,
  onEditPost,
  userDetails,
  setScrollEvent,
  scroll,
}) => {
  if (posts) {
    return (
      <ul
        className={`${classes.posts} ${scroll ? classes.scroll : ""}`}
        ref={setScrollEvent}
      >
        {posts.map((post, i) => {
          return (
            <FeedPost
              i={i + 1}
              key={post.postId}
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
