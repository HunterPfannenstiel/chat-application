import { ChangeEvent, FunctionComponent, useRef, useState } from "react";
import classes from "./SearchBar.module.css";
import ClearSearchIcon from "../Icons/ClearSearchIcon";

interface SearchBarProps {
  setSearchTerm: (searchTerm: string) => void;
  searchTerm: string;
  instantFetch: (term: string) => void;
}

const SearchBar: FunctionComponent<SearchBarProps> = ({
  searchTerm,
  setSearchTerm,
  instantFetch,
}) => {
  const search = (event: React.FormEvent) => {
    event.preventDefault();
    console.log(searchTerm);
  };

  const clearSearch = () => {
    instantFetch("");
  };

  return (
    <form onSubmit={search} className={classes.search}>
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
