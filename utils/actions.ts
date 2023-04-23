import { FeedPost } from "@_types/post/feed-post";
import { ImageInfo } from "@ui/Resuable/PostModal/types";
import { createFormData } from "./form";

export const updateFollowing = (
  followingUserId: number,
  action: "follow" | "unfollow"
) => {
  fetch("/api/user/follow", {
    method: "POST",
    body: JSON.stringify({ followingUserId, action }),
    headers: { "Content-Type": "application/json" },
  });
};

export const updatePostLike = (postId: number, action: "like" | "unlike") => {
  fetch("/api/post/like", {
    method: "POST",
    body: JSON.stringify({ postId, action }),
    headers: { "Content-Type": "application/json" },
  });
};

export const fetchPostComments = async (
  postId: string | string[] | undefined,
  page: number
) => {
  if (typeof postId === "string") {
    const res = await fetch(`/api/post/${postId}?page=${page}`);
    if (res.ok) {
      const post = (await res.json()).post as FeedPost[];

      if (post.length > 0) {
        return { mainPost: post!.shift(), comments: post } as {
          mainPost: FeedPost;
          comments: FeedPost[];
        };
      }
      throw new Error("Invalid post to fetch");
    } else {
      throw new Error("Error fetching post!");
    }
  } else if (postId !== undefined) {
    throw new Error("Invalid post to fetch");
  }
};

export const createPost = async (
  content: string,
  images: ImageInfo[],
  replyToPostId?: number
) => {
  const blobs = images.map((image) => image.blob);
  const formData = createFormData({ content, replyToPostId }, { images: blobs });
  const res = await fetch("/api/post", {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    throw new Error("Creating post failed");
  }

  const data = await res.json();
  return data.post as FeedPost;
};
