import { UserDetails, UserStats } from "@_types/user";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useEffect } from "react";

const useStats = () => {
  const { handle } = useRouter().query;
  const { data, isLoading, isError } = useQuery({
    queryKey: ["stats", handle],
    queryFn: fetcher.bind(null, handle),
  });

  const updateFollowerCount = (amount: number, userIndex?: number) => {
    if (data) {
      data.followerCount += amount;
    }
  };

  return { data, isLoading, isError, updateFollowerCount };
};

const fetcher = async (handle: string | string[] | undefined) => {
  if (typeof handle === "string") {
    const res = await fetch(`/api/stats?handle=${handle}`);
    if (!res.ok) {
      throw new Error("Could not fetch analytics");
    }
    const data = await res.json();
    data.analytics["userHandle"] = handle;
    return data.analytics as UserStats;
  }
};

export default useStats;
