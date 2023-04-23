import { FunctionComponent } from "react";
import classes from "./Search.module.css";
import useAnimateModal from "@hooks/animation/useAnimateModal";
import SearchNav from "./SearchNav";

interface SearchProps {
    userImage: string,
}

const Search: FunctionComponent<SearchProps> = ({ userImage }) => {
	const { toggle, showModal, playAnimation } = useAnimateModal(300);
	return (
		<>
			<SearchNav
				userImage={userImage}
				toggleModal={toggle}
			/>
		</>
	);
};

export default Search;
