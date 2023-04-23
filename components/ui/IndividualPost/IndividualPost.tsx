import { FunctionComponent, useEffect, useState } from "react";
import classes from "./IndividualPost.module.css";
import { FeedPost as FeedPosts } from "@_types/post/feed-post";
import FeedPost from "@ui/Resuable/FeedPost/FeedPost";
import PostModal from "@ui/Resuable/PostModal/PostModal";
import useAnimateModal from "@hooks/animation/useAnimateModal";
import { ImageInfo } from "@ui/Resuable/PostModal/types";
import { createPost } from "utils/actions";
import CommentIcon from "@ui/Resuable/Icons/CommentIcon";
import CreatePostIcon from "@ui/Resuable/Icons/CreatePostIcon";

interface IndividualPostProps {
	mainPost: FeedPosts;
	commentPosts: FeedPosts[];
}

const IndividualPost: FunctionComponent<IndividualPostProps> = ({
	mainPost,
	commentPosts,
}) => {
  const [newComments, setNewComments] = useState<FeedPosts[]>([]);
  const { showModal, playAnimation, toggle } = useAnimateModal(300);
  const addNewComment = (comment: FeedPost) => {
    setNewComments((prevState) => [...prevState, comment]);
  };
  return (
    <>
      <FeedPost post={mainPost} />
      {commentPosts.map((post) => {
        return <FeedPost post={post} />;
      })}
      {newComments.map((post) => {
        return <FeedPost post={post} />;
      })}
      <CreatePostIcon onClick={toggle} />
      {showModal && (
        <PostModal
          modalProps={{ playAnimation, toggle, animationTime: 300 }}
          modalTitle="Create a Comment"
          createPostHandler={createCommentHandler(
            mainPost.postId,
            addNewComment
          )}
          buttonText="Add Comment"
        />
      )}
    </>
  );
};

const createCommentHandler =
  (postId: number, newComment: (comment: FeedPosts) => void) =>
  async (content: string, images: ImageInfo[]) => {
    const comment = await createPost(content, images, false);
    if (!comment.images) comment.images = [];
    newComment(comment);
  };

export default IndividualPost;
