import { useQuery } from "@tanstack/react-query";
import { ConnectionsDetails } from "@_types/user";
import { useRouter } from "next/router";
import usePageFetch from "@hooks/page-fetch/usePageFetch";

const useFollow = (param: "followers" | "following") => {
  const router = useRouter();

  const { handle } = router.query;
  if (typeof handle !== "string") {
    return { data: [] };
  }

  const fetcher = async (page: number, date: string) => {
    const url = `/api/user/${param}/${handle}?page=${page}&date=${date}`;
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error("No data found");
    }
    const data = await res.json();
    return data[param];
  };

  const { pageContent } = usePageFetch(fetcher, true, 20);

  // const { data, isLoading, isError } = useQuery({
  //   queryKey: ["follow"],
  //   queryFn: fetcher.bind(null, handle as string, param),
  // });

  return { data: pageContent };
};

export default useFollow;
