import { useQuery } from "@tanstack/react-query";
import { ConnectionsDetails } from "@_types/user";
import { useRouter } from "next/router";
import usePageFetch from "@hooks/page-fetch/usePageFetch";

const useFollow = (param: "followers" | "following") => {
  const { query } = useRouter();

  const fetcher = async (
    page: number,
    date: string,
    controller: AbortController,
    dep: any
  ) => {
    if (typeof dep.handle === "string") {
      const url = `/api/user/${param}/${dep.handle}?page=${page}&date=${date}`;
      const res = await fetch(url, { signal: controller.signal });
      if (!res.ok) {
        throw new Error("No data found");
      }
      const data = await res.json();
      return data[param];
    }
  };

  const { pageContent, setScrollEvent, setPageContent } = usePageFetch(
    fetcher,
    true,
    20,
    query
  );

  const updateFollowerCount = (amount: number, userIndex?: number) => {
    setPageContent((prevState) => {
      if (prevState && (userIndex || userIndex === 0)) {
        const copyState = [...prevState];
        copyState[userIndex].followerCount += amount;
        return copyState;
      }
    });
  };

  // const { data, isLoading, isError } = useQuery({
  //   queryKey: ["follow"],
  //   queryFn: fetcher.bind(null, handle as string, param),
  // });

  return { data: pageContent || [], setScrollEvent, updateFollowerCount };
};

export default useFollow;
