import type { FeedPost } from "../types/post/feed-post";

export const mockFeedPosts: FeedPost[] = [
  {
    postId: "123",
    userId: "1234",
    content: "This is the first test post!",
    imageUrls: null,
    postTags: [
      {
        tagId: "1",
        name: "First Post",
        description: "This is a tag for the first post",
        color: "gold",
      },
    ],
    createdOn: new Date(),
    replyToPostId: null,
  },
  {
    postId: "124",
    userId: "1235",
    content: "This is the second test post!",
    imageUrls: null,
    postTags: [
      {
        tagId: "2",
        name: "Education",
        description: "This post contains educational content",
        color: "blue",
      },
    ],
    createdOn: new Date(),
    replyToPostId: null,
  },
  {
    postId: "125",
    userId: "1234",
    content: "This is the third test post!",
    postTags: [
      {
        tagId: "3",
        name: "Entertainment",
        description: "This post contains entertaining content",
        color: "red",
      },
    ],
    imageUrls: null,
    createdOn: new Date(),
    replyToPostId: null,
  },
];
