import { FeedPost as FeedPostT } from "@_types/post/feed-post";
import { FunctionComponent } from "react";
import FeedPost from "../FeedPost";
import classes from "./index.module.css";

interface FeedPostListProps {
  posts: FeedPostT[] | undefined;
}

const FeedPostList: FunctionComponent<FeedPostListProps> = ({ posts }) => {
  if (posts) {
    return (
      <ul className={classes.posts}>
        {posts.map((post) => {
          return (
            <FeedPost
              userImage={post.userImage}
              userHandle={post.userHandle}
              username={post.userName}
              postContent={post.content}
              likes={post.likeCount}
              comments={post.commentCount}
            />
          );
        })}
      </ul>
    );
  } else
    return (
      <p>
        No one you follow has posted! Follow more people or view the 'Global'
        page!
      </p>
    );
};

export default FeedPostList;
