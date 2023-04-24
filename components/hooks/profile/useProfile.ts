import { useQuery } from "@tanstack/react-query";
import { UserProfile } from "@_types/user/profile";
import { useRouter } from "next/router";
import { UserDetails } from "@_types/user";
import { FeedPost } from "@_types/post/feed-post";

const useProfile = () => {
  const router = useRouter();
  let handle = "";
  if (router.query.handle) {
    handle = router.query.handle as string;
  }
  console.log("ROUTER", router.query);
  const { data, isLoading, error } = useQuery({
    queryKey: ["profile", handle],
    queryFn: fetchPosts.bind(null, handle),
  });

  return { posts: data, isLoading, error };
};

type Profile = { user: UserProfile; isUsersProfile: boolean };

const fetchPosts = async (
  handle: string | undefined
): Promise<FeedPost[] | null> => {
  if (handle) {
    const res = await fetch(`/api/user/${handle}`);
    if (res.ok) {
      const data = (await res.json()) as { posts: FeedPost[] };
      return data.posts;
    } else {
      throw new Error("No profile found");
    }
  }
  console.log("undef");
  return null;
};
export default useProfile;
