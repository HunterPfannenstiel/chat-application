import { FeedPost } from "@_types/post/feed-post";
import usePageFetch from "@hooks/page-fetch/usePageFetch";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { fetchComments, fetchPost } from "utils/actions";

const usePostComments = () => {
  const { postId } = useRouter().query;
  const [mainPost, setMainPost] = useState<FeedPost>();
  const { pageContent, setScrollEvent } = usePageFetch(
    fetchComments,
    true,
    15,
    postId
  );
  useEffect(() => {
    if (postId) {
      const fetcher = async () => {
        const data = await fetchPost(postId);
        setMainPost(data);
      };
      fetcher();
    }
  }, [postId]);

  const updateMainPostCommentCount = () => {
    setMainPost((prevState) => {
      if (prevState) {
        const copy = { ...prevState };
        if (copy?.commentCount) copy.commentCount++;
        return copy;
      }
    });
  };

  return {
    post: { mainPost, replies: pageContent },
    setScrollEvent,
    updateMainPostCommentCount,
  };
};

export default usePostComments;
