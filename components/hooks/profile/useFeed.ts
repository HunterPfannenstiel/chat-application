import { UserFeed } from "@_types/user";
import { useQuery } from "@tanstack/react-query";

const useFeed = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["feed"],
    queryFn: fetchFeed,
  });

  return { user: data, isLoading, isError };
};

const fetchFeed = async () => {
  const res = await fetch("/api/feed");
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message);
  }
  return data.user as UserFeed;
};

export default useFeed;
