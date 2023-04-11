import useFollow from "@hooks/profile/useFollow";
import Followers from "@ui/Followers/Followers";
import { FunctionComponent } from "react";
import classes from "./FollowersPage.module.css";

const FollowersPage: FunctionComponent = () => {
	const { data, isLoading, isError } = useFollow("followers");
	if (isLoading) {
		return <h1>Loading...</h1>;
	} else if (isError) {
		return <h1>Error</h1>;
	} else if (data) {
		return <Followers followers={data}/>;
	}
	return <></>;
};

export default FollowersPage;
