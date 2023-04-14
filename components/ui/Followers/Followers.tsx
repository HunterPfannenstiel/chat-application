import { FollowerDetails } from "@_types/user";
import { FunctionComponent } from "react";
import UserBlock from "@ui/Resuable/UserBlock/UserBlock";

interface FollowersProps {
	followers: FollowerDetails[];
}

const Followers: FunctionComponent<FollowersProps> = ({ followers }) => {
	console.log("followers", followers);
	return (
		<>
			{followers.map((follower) => {
				return <UserBlock user={follower} buttonText="Follow" />;
			})}
		</>
	);
};

export default Followers;
