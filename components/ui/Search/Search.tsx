import { FunctionComponent } from "react";
import SearchNav from "./SearchNav";
import useUserSearch from "@hooks/user-search/useUserSearch";
import UserBlock from "@ui/Resuable/UserBlock/UserBlock";
import Connections from "@ui/Connections/Connections";

interface SearchProps {
  userImage: string;
}

const Search: FunctionComponent<SearchProps> = ({ userImage }) => {
  const { setSearchTerm, searchTerm, users, instantFetch } = useUserSearch();
  return (
    <>
      <SearchNav
        userImage={userImage}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        instantFetch={instantFetch}
      />
      {users && (
        <Connections users={users}/>
      )}
    </>
  );
};

export default Search;
