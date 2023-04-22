import { UserFeed } from "@_types/user";
import usePageFetch from "@hooks/page-fetch/usePageFetch";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const useFeed = () => {
  const [fetchGlobal, setFetchGlobal] = useState(false);
  const { scrollElement } = usePageFetch(fetchFeedPage, false, true, 20);
  const { query } = useRouter();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["feed", fetchGlobal],
    queryFn: fetchFeed.bind(null, fetchGlobal),
  });
  useEffect(() => {
    if (query.feed) {
      setFetchGlobal(true);
    } else {
      setFetchGlobal(false);
    }
  }, [query]);
  return { feed: data, isLoading, isError, scrollElement };
};

const fetchFeed = async (global: boolean) => {
  const res = await fetch(`/api/feed${global ? "?global=true" : ""}`);
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message);
  }
  return data as { user: UserFeed; isSignedIn: boolean };
};

const fetchFeedPage = async () => {
  console.log("Fetch Page");
  return [];
};

export default useFeed;
