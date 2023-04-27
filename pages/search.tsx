import { FunctionComponent } from "react";
import classes from "./SearchPage.module.css";
import Search from "@ui/Search/Search";

interface SearchPageProps {}

const SearchPage: FunctionComponent<SearchPageProps> = () => {
  //Because of how page fetching works and updating a relevant content instantly, we will handle /search in the main nav component
  return <></>;
};

export default SearchPage;
