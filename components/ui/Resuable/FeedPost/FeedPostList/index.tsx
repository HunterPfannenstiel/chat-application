import { FeedPost as FeedPostT } from "@_types/post/feed-post";
import { FunctionComponent, ReactNode, RefObject, useState } from "react";
import FeedPost from "../FeedPost";
import classes from "./index.module.css";
import { UserInfo } from "@_types/user";
import { SetScrollEvent } from "@hooks/page-fetch/types";
import useAnimateModal from "@hooks/animation/useAnimateModal";
import ImageView from "@ui/Resuable/ImageView/ImageView";
import { ParsedUrlQuery } from "querystring";

interface FeedPostListProps {
  posts: FeedPostT[] | undefined;
  emptyPostDisplay: ReactNode;
  isUsersFeed?: boolean;
  onEditPost?: (index: number) => void;
  userDetails?: UserInfo;
  setScrollEvent?: SetScrollEvent;
  scroll?: boolean;
  globalPosts?: FeedPostT[];
  query?: ParsedUrlQuery;
  isLoading?: boolean;
}

const FeedPostList: FunctionComponent<FeedPostListProps> = ({
  posts,
  emptyPostDisplay,
  isUsersFeed,
  onEditPost,
  userDetails,
  setScrollEvent,
  scroll,
  isLoading,
}) => {
  const { playAnimation, toggle, showModal } = useAnimateModal(300);
  const [images, setImages] = useState<any[]>([]);
  if (posts && posts.length > 0) {
    const displayImages = (images: any[]) => {
      setImages(images);
      if (images.length > 0) toggle();
    };
    return (
      <ul
        className={`${classes.posts} ${scroll ? classes.scroll : ""}`}
        ref={setScrollEvent}
      >
        {isLoading && <></>}
        {!isLoading &&
          posts.map((post, i) => {
            return (
              <FeedPost
                key={post.postId}
                post={post}
                isUsersPost={isUsersFeed}
                onEditPost={onEditPost?.bind(null, i)}
                userDetails={userDetails}
                displayImages={displayImages}
              />
            );
          })}
        {!isLoading && showModal && images.length > 0 && (
          <ImageView
            images={images || []}
            modalProps={{ playAnimation, toggle, animationTime: 300 }}
          />
        )}
      </ul>
    );
  }
  return <>{emptyPostDisplay}</>;
};

export default FeedPostList;
