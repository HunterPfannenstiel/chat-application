import { UserFeed } from "@_types/user";
import usePageFetch from "@hooks/page-fetch/usePageFetch";
import { FeedPost } from "@_types/post/feed-post";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import { useState } from "react";

const useFeed = () => {
  const { query } = useRouter();
  const [isSignedIn, setIsSignedIn] = useState();
  const fetchFeed = async (
    page: number,
    date: string,
    controller: AbortController,
    query: ParsedUrlQuery
  ) => {
    let url = `/api/feed?page=${page}&date=${date}`;
    if (query.feed) {
      url += "&global=true";
    }
    const res = await fetch(url, { signal: controller.signal });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message);
    }
    if (isSignedIn == undefined) setIsSignedIn(data.isSignedIn);
    return data.posts as FeedPost[];
  };
  const { scrollElement, pageContent } = usePageFetch(
    fetchFeed,
    true,
    10,
    query
  );

  return { posts: pageContent, scrollElement, isSignedIn };
};

export default useFeed;
