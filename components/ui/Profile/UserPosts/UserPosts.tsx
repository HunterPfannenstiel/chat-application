import { FunctionComponent, useState } from "react";
import classes from "./UserPosts.module.css";
import FeedPostList from "@ui/Resuable/FeedPost/FeedPostList";
import { FeedPost } from "@_types/post/feed-post";
import useAnimateModal from "@hooks/animation/useAnimateModal";
import PostModal from "@ui/Resuable/PostModal/PostModal";
import type { Image } from "@_types/post";
import { ImageInfo } from "@ui/Resuable/PostModal/types";

interface UserPostsProps {
  posts: FeedPost[];
  isUsersProfile: boolean;
}

const UserPosts: FunctionComponent<UserPostsProps> = ({
  posts,
  isUsersProfile,
}) => {
  const { showModal, playAnimation, toggle } = useAnimateModal(300);
  const [editPostIndex, setEditPostIndex] = useState(0);
  const onEditPost = (index: number) => {
    setEditPostIndex(index);
    toggle();
  };
  return (
    <>
      <FeedPostList
        posts={posts}
        emptyPostDisplay={<p>No posts to show here!</p>}
        isUsersFeed={true}
        onEditPost={onEditPost}
      />
      {showModal && (
        <PostModal
          modalProps={{ playAnimation, toggle, animationTime: 300 }}
          createPostHandler={editPostHandler(
            posts[editPostIndex].postId,
            posts[editPostIndex].content,
            posts[editPostIndex].images
          )}
          modalTitle="Update Post"
          initialContents={{
            content: posts[editPostIndex].content,
            imageUrls: posts[editPostIndex].images,
          }}
          buttonText="Update"
        />
      )}
    </>
  );
};

const editPostHandler =
  (
    postId: number,
    initialContent: string,
    initialImages: Image[] | undefined
  ) =>
  (content: string, images: ImageInfo[]) => {
    console.log({ content, images });
    return new Promise<void>((resolve) => {
      resolve();
    });
  };

export default UserPosts;
