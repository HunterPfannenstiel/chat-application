import { ConnectionsDetails, UserDetails } from "@_types/user";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

const useUserSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [fetchSearchTerm, setFetchSearchTerm] = useState("");
  const { data, isLoading, isError } = useQuery({
    queryKey: ["search", fetchSearchTerm],
    queryFn: fetchUsers.bind(null, fetchSearchTerm),
  });
  useEffect(() => {
    let timer: NodeJS.Timeout;
    timer = setTimeout(() => {
      if (searchTerm !== fetchSearchTerm) setFetchSearchTerm(searchTerm);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [searchTerm]);

  return {
    setSearchTerm,
    searchTerm,
    instantFetch: setFetchSearchTerm,
    users: data,
    isLoading,
    isError,
  };
};

const fetchUsers = async (searchTerm: string) => {
  const res = await fetch(`/api/search?searchTerm=${searchTerm}`);
  if (res.ok) {
    const data = await res.json();
    return data.users as UserDetails[];
  } else {
    console.log("error");
    return [];
  }
};

export default useUserSearch;
