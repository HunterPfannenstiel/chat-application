import { useRouter } from "next/router";
import { FeedPost } from "@_types/post/feed-post";
import usePageFetch from "@hooks/page-fetch/usePageFetch";

const useProfile = () => {
  const router = useRouter();

  const fetchPosts = async (
    page: number,
    date: string,
    controller: AbortController,
    dependency: any
  ): Promise<FeedPost[] | null> => {
    if (dependency.handle) {
      let url = `/api/user/${dependency.handle}?page=${page}&date=${date}`;
      if (dependency.category) {
        url += `&category=${dependency.category}`;
      }
      const res = await fetch(url, { signal: controller.signal });
      if (res.ok) {
        const data = (await res.json()) as { posts: FeedPost[] };
        return data.posts;
      } else {
        throw new Error("No profile found");
      }
    }
    return null;
  };
  const { pageContent, setScrollEvent } = usePageFetch(
    fetchPosts,
    true,
    10,
    router.query
  );

  return { posts: pageContent, setScrollEvent };
};

export default useProfile;
