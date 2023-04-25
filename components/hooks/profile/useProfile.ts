import { useRouter } from "next/router";
import { FeedPost } from "@_types/post/feed-post";
import usePageFetch from "@hooks/page-fetch/usePageFetch";

const useProfile = () => {
  const router = useRouter();
  let handle = "";
  if (router.query.handle) {
    handle = router.query.handle as string;
  }

  const fetchPosts = async (
    page: number,
    date: string,
    controller: AbortController
  ): Promise<FeedPost[] | null> => {
    if (handle) {
      const url = `/api/user/${handle}?page=${page}&date=${date}`;
      const res = await fetch(url, { signal: controller.signal });
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
  const { resetPageContent, pageContent, scrollElement } = usePageFetch(
    fetchPosts,
    true,
    10,
    handle
  );
  return { posts: pageContent, scrollElement };
};

export default useProfile;
