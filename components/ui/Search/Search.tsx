import { FunctionComponent } from "react";
import useUserSearch from "@hooks/user-search/useUserSearch";
import UserBlock from "@ui/Resuable/UserBlock/UserBlock";
import { useSearch } from "components/providers/Search/Search";
import Connections from "@ui/Connections/Connections";

interface SearchProps {}

const Search: FunctionComponent<SearchProps> = () => {
  const { users } = useSearch();
  return (
    <Connections users={users} />
  );
};

export default Search;
