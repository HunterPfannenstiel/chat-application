import { ConnectionsDetails, UserDetails } from "@_types/user";

export const getInitialSearch = () => {
  const users: UserDetails[] = [];
  return {
    users,
    setSearchTerm: (term: string) => {},
    searchTerm: "",
    instantFetch: (term: string) => {},
    setScrollEvent: (e: HTMLElement | null) => {},
  };
};
