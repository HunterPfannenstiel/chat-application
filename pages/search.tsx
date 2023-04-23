import { FunctionComponent } from "react";
import classes from "./SearchPage.module.css";
import Search from "@ui/Search/Search";

interface SearchPageProps {}

const SearchPage: FunctionComponent<SearchPageProps> = () => {
  return <Search />;
};

export default SearchPage;
