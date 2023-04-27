import { UserDetails } from "@_types/user";
import usePageFetch from "@hooks/page-fetch/usePageFetch";
import { useEffect, useState } from "react";

const useUserSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [fetchSearchTerm, setFetchSearchTerm] = useState("");
  const pageFetch = usePageFetch(fetchUsers, true, 11, fetchSearchTerm);
  useEffect(() => {
    let timer: NodeJS.Timeout;
    timer = setTimeout(() => {
      if (searchTerm !== fetchSearchTerm) {
        console.log("fetch");
        setFetchSearchTerm(searchTerm);
      }
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [searchTerm]);

  const updateFollowerCount = (amount: number, userIndex?: number) => {
    pageFetch.setPageContent((prevState) => {
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
    users: pageFetch.pageContent || [],
    isLoading: pageFetch.isLoading,
    isError: pageFetch.isError,
    setScrollEvent: pageFetch.setScrollEvent,
    updateFollowerCount,
  };
};

const fetchUsers = async (
  page: number,
  date: string,
  controller: AbortController,
  searchTerm: string
) => {
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
