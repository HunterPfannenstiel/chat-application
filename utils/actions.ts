import { FeedPost } from "@_types/post/feed-post";

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
