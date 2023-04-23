import { FunctionComponent } from 'react';
import classes from './SearchNav.module.css'
import ProfileImage from '@ui/Resuable/Profile/ProfileImage/ProfileImage';
import SearchBar from '@ui/Resuable/SearchBar/SearchBar';
    
interface SearchNavProps {
	userImage: string;
	toggleModal: () => void;
}

const SearchNav: FunctionComponent<SearchNavProps> = ({
	userImage,
	toggleModal,
}) => {
	return (
		<nav className={classes.nav}>
			<ProfileImage
				src={userImage}
				circleDiameter="50px"
				onClick={toggleModal}
			/>
            <SearchBar />
		</nav>
	);
};
    
export default SearchNav;