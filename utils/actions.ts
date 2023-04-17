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
