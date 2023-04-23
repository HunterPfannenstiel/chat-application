import { ConnectionsDetails } from "@_types/user";

export const getInitialSearch = () => {
  const users: ConnectionsDetails[] = [];
  return {
    users,
    setSearchTerm: (term: string) => {},
    searchTerm: "",
    instantFetch: (term: string) => {},
  };
};
