import { ConnectionsDetails, UserDetails } from "@_types/user";
import usePageFetch from "@hooks/page-fetch/usePageFetch";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

const useUserSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [fetchSearchTerm, setFetchSearchTerm] = useState("");
  // const { data, isLoading, isError } = useQuery({
  //   queryKey: ["search", fetchSearchTerm],
  //   queryFn: fetchUsers.bind(null, fetchSearchTerm),
  // });
  const { pageContent, isError, isLoading, setScrollEvent, setPageContent } =
    usePageFetch(fetchUsers, true, 11, fetchSearchTerm);
  useEffect(() => {
    let timer: NodeJS.Timeout;
    timer = setTimeout(() => {
      if (searchTerm !== fetchSearchTerm) {
        setFetchSearchTerm(searchTerm);
      }
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [searchTerm]);

  const updateFollowerCount = (amount: number, userIndex?: number) => {
    setPageContent((prevState) => {
      if (prevState && (userIndex || userIndex === 0)) {
        const copyState = [...prevState];
        copyState[userIndex].followerCount += amount;
        return copyState;
      }
    });
  };

  return {
    setSearchTerm,
    searchTerm,
    instantFetch: setFetchSearchTerm,
    users: pageContent || [],
    isLoading,
    isError,
    setScrollEvent,
    updateFollowerCount,
  };
};

const fetchUsers = async (
  page: number,
  date: string,
  controller: AbortController,
  searchTerm: string
) => {
  // if (searchTerm === "") {
  //   console.log("Top users");
  //   return [];
  // }
  const res = await fetch(
    `/api/search?searchTerm=${searchTerm}&page=${page}&date=${date}`,
    { signal: controller.signal }
  );
  if (res.ok) {
    const data = await res.json();
    return data.users as UserDetails[];
  } else {
    console.log("error");
    return [];
  }
};

export default useUserSearch;
