import { UserDetails } from "@_types/user";
import useUserSearch from "@hooks/user-search/useUserSearch";
import Connections from "@ui/Connections/Connections";
import { FunctionComponent } from "react";

interface SearchProps {
  users: UserDetails[];
  updateFollowerCount: (amount: number, userIndex?: number | undefined) => void;
  setScrollEvent: (e: HTMLElement | null) => void;
}

const Search: FunctionComponent<SearchProps> = ({
  users,
  updateFollowerCount,
  setScrollEvent,
}) => {
  return (
    <Connections
      users={users}
      updateFollowerCount={updateFollowerCount}
      setScrollEvent={setScrollEvent}
    />
  );
};

export default Search;
