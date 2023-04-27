import { FunctionComponent } from "react";
import classes from "./DesktopSearch.module.css";
import SearchBar from "../SearchBar/SearchBar";
import { useSearch } from "components/providers/Search/Search";
import Connections from "@ui/Connections/Connections";

interface DesktopSearchProps {}

const DesktopSearch: FunctionComponent<DesktopSearchProps> = () => {
  const { users, setScrollEvent, updateFollowerCount } = useSearch();
  return (
    <div className={classes.search}>
      <SearchBar />
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
