import { FunctionComponent } from "react";
import classes from "./DesktopSearch.module.css";
import SearchBar from "../SearchBar/SearchBar";
import Connections from "@ui/Connections/Connections";
import useUserSearch from "@hooks/user-search/useUserSearch";

interface DesktopSearchProps {}

const DesktopSearch: FunctionComponent<DesktopSearchProps> = () => {
  const {
    users,
    setScrollEvent,
    updateFollowerCount,
    setSearchTerm,
    instantFetch,
    searchTerm,
  } = useUserSearch();

  return (
    <div className={classes.search}>
      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        instantFetch={instantFetch}
      />
      <Connections
        users={users}
        className={classes.users}
        setScrollEvent={setScrollEvent}
        updateFollowerCount={updateFollowerCount}
      />
    </div>
  );
};

export default DesktopSearch;
