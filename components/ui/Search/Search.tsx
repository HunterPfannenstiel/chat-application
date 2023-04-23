import { FunctionComponent } from "react";
import SearchNav from "./SearchNav";
import useUserSearch from "@hooks/user-search/useUserSearch";
import UserBlock from "@ui/Resuable/UserBlock/UserBlock";

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
        <ul>
          {users.map((user) => {
            return <UserBlock user={user} />;
          })}
        </ul>
      )}
    </>
  );
};

export default Search;
