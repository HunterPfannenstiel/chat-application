import { FunctionComponent } from "react";
import classes from "./StatsPage.module.css";
import Stats from "@ui/Stats/Stats";

interface StatsPageProps {}

const StatsPage: FunctionComponent<StatsPageProps> = () => {
	return (
		<Stats
			image="https://upload.wikimedia.org/wikipedia/en/6/6a/Mike_Wazowski.png"
			followerCount={93803}
            followingCount={1}
            likesGiven={3}
            likesReceived={984824}
            postsMade={1}
            repliesReceived={98328}
		/>
	);
};

export default StatsPage;
