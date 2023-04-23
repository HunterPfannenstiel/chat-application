import { FunctionComponent } from "react";
import useUserSearch from "@hooks/user-search/useUserSearch";
import UserBlock from "@ui/Resuable/UserBlock/UserBlock";
import { useSearch } from "components/providers/Search/Search";

interface SearchProps {}

const Search: FunctionComponent<SearchProps> = () => {
  const { users } = useSearch();
  return (
    <ul>
      {users.map((user) => {
        return <UserBlock user={user} />;
      })}
    </ul>
  );
};

export default Search;
