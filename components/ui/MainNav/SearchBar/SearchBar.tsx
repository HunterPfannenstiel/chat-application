import { ChangeEvent, FunctionComponent, useRef, useState } from "react";
import classes from "./SearchBar.module.css";
import ClearSearchIcon from "../../Resuable/Icons/ClearSearchIcon";
import { useSearch } from "components/providers/Search/Search";

interface SearchBarProps {}

const SearchBar: FunctionComponent<SearchBarProps> = ({}) => {
  const { searchTerm, setSearchTerm, instantFetch } = useSearch();

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
