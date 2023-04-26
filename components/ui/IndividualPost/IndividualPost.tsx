import { FunctionComponent, RefObject, useEffect, useState } from "react";
import classes from "./IndividualPost.module.css";
import { FeedPost as FeedPosts } from "@_types/post/feed-post";
import FeedPost from "@ui/Resuable/FeedPost/FeedPost";
import PostModal from "@ui/Resuable/PostModal/PostModal";
import useAnimateModal from "@hooks/animation/useAnimateModal";
import { ImageInfo } from "@ui/Resuable/PostModal/types";
import { createPost } from "utils/actions";
import CommentIcon from "@ui/Resuable/Icons/CommentIcon";
import CreatePostIcon from "@ui/Resuable/Icons/CreatePostIcon";
import { SetScrollEvent } from "@hooks/page-fetch/types";

interface IndividualPostProps {
  mainPost: FeedPosts | undefined;
  commentPosts: FeedPosts[] | undefined;
  setScorllEvent: SetScrollEvent;
  updateCommentCount: () => void;
}

const IndividualPost: FunctionComponent<IndividualPostProps> = ({
  mainPost,
  commentPosts,
  setScorllEvent,
  updateCommentCount,
}) => {
  const [newComments, setNewComments] = useState<FeedPosts[]>([]);
  const { showModal, playAnimation, toggle } = useAnimateModal(300);
  let replyCount = newComments.length;
  if (commentPosts?.length) {
    replyCount += commentPosts.length;
  }

  const addNewComment = (comment: FeedPost) => {
    setNewComments((prevState) => [...prevState, comment]);
  };
  return (
    <>
      <ul className={classes.container} ref={setScorllEvent}>
        {mainPost && (
          <div className={classes.main_container}>
            <FeedPost post={mainPost} />
            <div className={classes.add_comment}>
              <button onClick={toggle}>Post a Reply</button>
            </div>
            <p className={classes.count}>
              Replies: <span>{replyCount}</span>
            </p>
          </div>
        )}
        {commentPosts?.map((post) => {
          return <FeedPost post={post} key={post.postId} />;
        })}
        {newComments.map((post) => {
          return <FeedPost post={post} key={post.postId} />;
        })}
      </ul>
      <CreatePostIcon onClick={toggle} />
      {showModal && mainPost && (
        <PostModal
          modalProps={{ playAnimation, toggle, animationTime: 300 }}
          modalTitle="Create a Comment"
          createPostHandler={createCommentHandler(
            mainPost.postId,
            addNewComment,
            updateCommentCount
          )}
          buttonText="Add Comment"
        />
      )}
    </>
  );
};

const createCommentHandler =
  (
    postId: number,
    newComment: (comment: FeedPosts) => void,
    updateCommentCount: () => void
  ) =>
  async (content: string, images: ImageInfo[]) => {
    const comment = await createPost(content, images, postId);
    if (!comment.images) comment.images = [];
    newComment({
      ...comment,
      likeCount: 0,
      commentCount: 0,
      images: images.map((image) => {
        return { imageUrl: image.imageUrl, aspectRatio: image.aspectRatio };
      }),
    });
    updateCommentCount();
  };

export default IndividualPost;
