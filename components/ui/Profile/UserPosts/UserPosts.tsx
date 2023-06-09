import { FunctionComponent, useEffect, useState } from "react";
import FeedPostList from "@ui/Resuable/FeedPost/FeedPostList";
import { FeedPost } from "@_types/post/feed-post";
import useAnimateModal from "@hooks/animation/useAnimateModal";
import PostModal from "@ui/Resuable/PostModal/PostModal";
import { ImageInfo } from "@ui/Resuable/PostModal/types";
import { createFormData } from "utils/form";
import { UserInfo } from "@_types/user";
import { useRouter } from "next/router";

interface UserPostsProps {
  posts: FeedPost[];
  isUsersProfile: boolean;
  user: UserInfo;
  isLoading: boolean;
}

const UserPosts: FunctionComponent<UserPostsProps> = ({
  posts,
  isUsersProfile,
  user,
  isLoading,
}) => {
  console.log("param posts", posts);
  const { query } = useRouter();
  const { showModal, playAnimation, toggle } = useAnimateModal(300);
  const [userPosts, setUserPosts] = useState(posts);
  const [editPostIndex, setEditPostIndex] = useState(0);
  const onEditPost = (index: number) => {
    setEditPostIndex(index);
    toggle();
  };

  const editPostHandler = async (
    content: string,
    images: ImageInfo[],
    deleteImages: boolean
  ) => {
    const initialContent = userPosts[editPostIndex];
    if (
      deleteImages ||
      content !== initialContent.content ||
      images.length > 0
    ) {
      if (!deleteImages) deleteImages = images.length > 0;
      const blobs = images.map((image) => image.blob);
      const formData = createFormData(
        { content, postId: initialContent.postId, deleteImages },
        { images: blobs }
      );
      const res = await fetch("/api/post", { method: "PUT", body: formData });
      if (res.ok) {
        let newImages = initialContent.images;
        if (deleteImages) {
          newImages = images.map((image) => {
            return { imageUrl: image.imageUrl, aspectRatio: image.aspectRatio };
          });
        }
        setUserPosts((prevState) => {
          let copyState = [...prevState];
          if (copyState[editPostIndex].images) {
            copyState[editPostIndex].images = [
              ...copyState[editPostIndex].images!,
            ];
          }
          copyState[editPostIndex].content = content;
          copyState[editPostIndex].images = newImages;
          return copyState;
        });
      } else {
        console.log("Error");
      }
    }
  };

  useEffect(() => {
    console.log("effect posts", posts);
    setUserPosts(posts);
  }, [posts]);

  return (
    <>
      <FeedPostList
        isLoading={isLoading}
        posts={userPosts}
        emptyPostDisplay={
          <p style={{ textAlign: "center", marginTop: "1rem" }}>
            No posts to show here!
          </p>
        }
        isUsersFeed={query.category === "likes" ? false : isUsersProfile}
        onEditPost={onEditPost}
        userDetails={query.category === "likes" ? undefined : user}
      />
      {showModal && (
        <PostModal
          modalProps={{ playAnimation, toggle, animationTime: 300 }}
          createPostHandler={editPostHandler}
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

export default UserPosts;
