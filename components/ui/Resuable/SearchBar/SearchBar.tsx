import { FunctionComponent, useRef, useState } from "react";
import classes from "./SearchBar.module.css";
import ClearSearchIcon from "../Icons/ClearSearchIcon";

interface SearchBarProps {}

const SearchBar: FunctionComponent<SearchBarProps> = () => {
	const [searchTerm, updateSearchTerm] = useState("");
	const searchRef = useRef<HTMLInputElement>(null);

	const onSearchChange = () => {
		updateSearchTerm(searchRef.current!.value);
	};

	const search = (event: React.FormEvent) => {
		event.preventDefault();
		console.log(searchTerm);
	};

    const clearSearch = () => {
        searchRef.current!.value = "";
        updateSearchTerm("");
    }

	return (
		<form onSubmit={search} className={classes.search}>
			<input type="text" ref={searchRef} onChange={onSearchChange} />
			<ClearSearchIcon className={classes.clear} onClick={clearSearch}/>
		</form>
	);
};

export default SearchBar;
