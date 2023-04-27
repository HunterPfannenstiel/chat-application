import { FunctionComponent } from "react";
import classes from "./SearchBar.module.css";
import ClearSearchIcon from "../../Resuable/Icons/ClearSearchIcon";

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  instantFetch: (term: string) => void;
}

const SearchBar: FunctionComponent<SearchBarProps> = ({
  searchTerm,
  setSearchTerm,
  instantFetch,
}) => {
  const clearSearch = () => {
    instantFetch("");
    setSearchTerm("");
  };

  return (
    <form
      className={classes.search}
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <input
        type="text"
        onChange={(e) => {
          setSearchTerm(e.target.value);
        }}
        value={searchTerm}
      />
      <ClearSearchIcon className={classes.clear} onClick={clearSearch} />
    </form>
  );
};

export default SearchBar;
