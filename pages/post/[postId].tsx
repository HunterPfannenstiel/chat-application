import { FunctionComponent, useEffect, useState } from "react";
import { FeedPost } from "@_types/post/feed-post";
import classes from "./SinglePostPage.module.css";
import IndividualPost from "@ui/IndividualPost/IndividualPost";
import { fetchPostComments } from "utils/actions";
import { useRouter } from "next/router";
import usePostComments from "@hooks/feed-post/usePostComments";

const SinglePostPage: FunctionComponent = () => {
  const { post, isLoading, isError } = usePostComments();

  if (isLoading) {
    return <>Loading</>;
  }
  if (isError) {
    return <>Error</>;
  }
  if (!post) {
    return <h1>No post exists</h1>;
  }
  return (
    <IndividualPost mainPost={post.mainPost} commentPosts={post.comments} />
  );
};

export default SinglePostPage;

//const posts: FeedPost[] = [
//     {
//       postId: 1,
//       content: "Algonquin",
//       likeCount: 3,
//       commentCount: 2,
//       images: [],
//       createdOn: "2023-04-15",
//       userImage:
//         "https://upload.wikimedia.org/wikipedia/en/6/6a/Mike_Wazowski.png",
//       userName: "A12",
//       userHandle: "A12",
//       tags: [],
//       isLiked: 1,
//     },
//     {
//       postId: 2,
//       content: "Hey Alg",
//       likeCount: 0,
//       commentCount: 0,
//       images: [],
//       createdOn: "2023-04-15",
//       userImage:
//         "https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Crystal_the_Monkey_at_SDCC_2012_%28cropped%29.jpg/1024px-Crystal_the_Monkey_at_SDCC_2012_%28cropped%29.jpg",
//       userName: "Josh",
//       userHandle: "Josh",
//       tags: [],
//       isLiked: 0,
//     },
//     {
//       postId: 3,
//       content: "Hey Alg",
//       likeCount: 0,
//       commentCount: 0,
//       images: [],
//       createdOn: "2023-04-15",
//       userImage:
//         "https://upload.wikimedia.org/wikipedia/commons/2/27/Baby_ginger_monkey.jpg",
//       userName: "Josh2",
//       userHandle: "Josh2",
//       tags: [],
//       isLiked: 0,
//     },
//   ];
