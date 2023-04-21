import { FunctionComponent, useState } from "react";
import classes from "./UserPosts.module.css";
import FeedPostList from "@ui/Resuable/FeedPost/FeedPostList";
import { FeedPost } from "@_types/post/feed-post";
import useAnimateModal from "@hooks/animation/useAnimateModal";
import PostModal from "@ui/Resuable/PostModal/PostModal";
import type { Image, UpdatePost } from "@_types/post";
import { ImageInfo } from "@ui/Resuable/PostModal/types";
import { createFormData } from "utils/form";
import { UserInfo } from "@_types/user";

interface UserPostsProps {
  posts: FeedPost[];
  isUsersProfile: boolean;
  user: UserInfo;
}

const UserPosts: FunctionComponent<UserPostsProps> = ({
  posts,
  isUsersProfile,
  user,
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
        userDetails={user}
      />
      {showModal && (
        <PostModal
          modalProps={{ playAnimation, toggle, animationTime: 300 }}
          createPostHandler={editPostHandler(
            posts[editPostIndex].postId,
            posts[editPostIndex].content
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
  (postId: number, initialContent: string) =>
  async (content: string, images: ImageInfo[], deleteImages: boolean) => {
    const blobs = images.map((image) => image.blob);
    const formData = createFormData(
      { content, postId, deleteImages },
      { images: blobs }
    );
    console.log({ content, images });
    const res = await fetch("/api/post", { method: "PUT", body: formData });
    if (res.ok) {
      console.log("OK");
    } else {
      console.log("ERRRORORROOROROR");
    }
  };

export default UserPosts;
