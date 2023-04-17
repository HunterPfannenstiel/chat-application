import { useQuery } from "@tanstack/react-query";
import { ConnectionsDetails } from "@_types/user";
import { useRouter } from "next/router";

const useFollow = (param: "followers" | "following") => {
  const router = useRouter();
  const { handle } = router.query;
  if (typeof handle !== "string") {
    router.back();
  }

  const { data, isLoading, isError } = useQuery({
    queryKey: ["follow"],
    queryFn: fetcher.bind(null, handle as string, param),
  });

  return { data, isLoading, isError };
};

const fetcher = async (
  userHandle: string,
  param: "followers" | "following"
) => {
  const res = await fetch(`/api/user/${param}/${userHandle}`);
  if (!res.ok) {
    throw new Error("No data found");
  }
  const data = await res.json();
  return data[param];
};

export default useFollow;
