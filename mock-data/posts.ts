import type { FeedPost } from "../types/post/feed-post";

export const mockFeedPosts: FeedPost[] = [
  {
    postId: "123",
    userHandle: "SHOES",
    userImage: "/Images/SHOES.png",
    userName: "OhShews",
    content: "This is the first test post!",
    imageUrls: [],
    tags: [
      {
        tagId: "1",
        name: "First Post",
        description: "This is a tag for the first post",
        color: "gold",
      },
    ],
    createdOn: new Date(),
    commentCount: 16,
    likeCount: 32,
  },
  {
    postId: "124",
    userHandle: "SHOES",
    userImage: "/Images/SHOES.png",
    userName: "OhShews",
    content: "This is the second test post!",
    imageUrls: [],
    tags: [
      {
        tagId: "2",
        name: "Education",
        description: "This post contains educational content",
        color: "blue",
      },
    ],
    createdOn: new Date(),
    commentCount: 22,
    likeCount: 120,
  },
  {
    postId: "125",
    userHandle: "Stars",
    userImage: "/Images/JoshuaStars.png",
    userName: "Joshua",
    content: "This is the third test post!",
    tags: [
      {
        tagId: "3",
        name: "Entertainment",
        description: "This post contains entertaining content",
        color: "red",
      },
    ],
    imageUrls: [],
    createdOn: new Date(),
    commentCount: 1000,
    likeCount: 22092,
  },
];
