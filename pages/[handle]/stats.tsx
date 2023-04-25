import { FunctionComponent } from "react";
import classes from "./StatsPage.module.css";
import Stats from "@ui/Stats/Stats";
import { UserDetails } from "@_types/user";

interface StatsPageProps {}

const StatsPage: FunctionComponent<StatsPageProps> = () => {
	const details: UserDetails = {
		followerCount: 93803,
		followingCount: 1,
		userImage: "https://upload.wikimedia.org/wikipedia/en/6/6a/Mike_Wazowski.png",
		userName: "happi",
		userHandle: "isHappi123",
		userId: 7,
		isFollowing: false,
		bio: "awesome"
	}
	return (
		<Stats
			userDetails={details}
            likesGiven={3}
            likesReceived={984824}
            postsMade={1}
            repliesReceived={98328}
		/>
	);
};

export default StatsPage;
