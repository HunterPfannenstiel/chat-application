import { ReactNode, createContext, useContext } from "react";
import { FunctionComponent } from "react";
import { getInitialSearch } from "./utils";
import useUserSearch from "@hooks/user-search/useUserSearch";

const Search = createContext(getInitialSearch());

interface SearchProviderProps {
  children: ReactNode;
}

const SearchProvider: FunctionComponent<SearchProviderProps> = ({
  children,
}) => {
  const {
    searchTerm,
    setSearchTerm,
    instantFetch,
    users,
    setScrollEvent,
    updateFollowerCount,
  } = useUserSearch();
  return (
    <Search.Provider
      value={{
        searchTerm,
        setSearchTerm,
        instantFetch,
        users,
        setScrollEvent,
        updateFollowerCount,
      }}
    >
      {children}
    </Search.Provider>
  );
};

export default SearchProvider;

export const useSearch = () => {
  const search = useContext(Search);
  return search;
};
