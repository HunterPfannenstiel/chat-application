import { FunctionComponent } from "react";
import classes from "./SearchNav.module.css";
import ProfileImage from "@ui/Resuable/Profile/ProfileImage/ProfileImage";
import SearchBar from "@ui/Resuable/SearchBar/SearchBar";

interface SearchNavProps {
  userImage: string;
  setSearchTerm: (searchTerm: string) => void;
  searchTerm: string;
  instantFetch: (term: string) => void;
}

const SearchNav: FunctionComponent<SearchNavProps> = ({
  userImage,
  setSearchTerm,
  searchTerm,
  instantFetch,
}) => {
  return (
    <nav className={classes.nav}>
      <ProfileImage src={userImage} circleDiameter="50px" />
      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        instantFetch={instantFetch}
      />
    </nav>
  );
};

export default SearchNav;
