import { useQuery } from "@tanstack/react-query";
import { ConnectionsDetails } from "@_types/user";

const useFollow = (param: "followers" | "following") => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["follow"],
    queryFn: fetcher.bind(null, "123", param),
  });

  return { data, isLoading, isError };
};

const fetcher = async (userId: string, param: "followers" | "following") => {
  const res = await fetch(`/api/user/${param}/${userId}`);
  if (!res.ok) {
    throw new Error("No data found");
  }
  const data = await res.json();
  return data[param];
};

export default useFollow;
