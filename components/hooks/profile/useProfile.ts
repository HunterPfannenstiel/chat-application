import { useQuery } from "@tanstack/react-query";
import { UserProfile } from "@_types/user/profile";
import { useRouter } from "next/router";
import { UserDetails } from "@_types/user";
import { FeedPost } from "@_types/post/feed-post";
import usePageFetch from "@hooks/page-fetch/usePageFetch";

const useProfile = () => {
  const router = useRouter();
  let handle = "";
  if (router.query.handle) {
    handle = router.query.handle as string;
  }
  console.log("ROUTER", router.query);
  // const { data, isLoading, error } = useQuery({
  //   queryKey: ["profile", handle],
  //   queryFn: fetchPosts.bind(null, handle),
  // });

  const fetchPosts = async (page: number): Promise<FeedPost[] | null> => {
    if (handle) {
      const res = await fetch(`/api/user/${handle}?page=${page}`);
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
  const { resetPageContent, pageContent } = usePageFetch(
    fetchPosts,
    true,
    true,
    handle
  );
  console.log({ pageContent });
  return { posts: pageContent };
};

type Profile = { user: UserProfile; isUsersProfile: boolean };
export default useProfile;
