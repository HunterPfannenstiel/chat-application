import { UserFeed } from "@_types/user";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const useFeed = () => {
  const [fetchGlobal, setFetchGlobal] = useState(false);
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
  return { feed: data, isLoading, isError };
};

const fetchFeed = async (global: boolean) => {
  const res = await fetch(`/api/feed${global ? "?global=true" : ""}`);
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message);
  }
  return data as { user: UserFeed; isSignedIn: boolean };
};

export default useFeed;
