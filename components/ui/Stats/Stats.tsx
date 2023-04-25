import { FunctionComponent } from "react";
import classes from "./Stats.module.css";
import ProfileImage from "@ui/Resuable/Profile/ProfileImage/ProfileImage";
import StatBlock from "@ui/Resuable/StatBlock/StatBlock";
import { useRouter } from "next/router";
import LikeIcon from "@ui/Resuable/Icons/LikeIcon";
import FollowerIcon from "@ui/Resuable/Icons/FollowerIcon";
import CommentIcon from "@ui/Resuable/Icons/CommentIcon";
import UserBlock from "@ui/Resuable/UserBlock/UserBlock";
import { UserDetails } from "@_types/user";
import FollowButton from "@ui/Resuable/FollowButton/FollowButton";

interface StatsProps {
	userDetails: UserDetails;
	likesReceived: number;
	likesGiven: number;
	postsMade: number;
	repliesReceived: number;
}

const Stats: FunctionComponent<StatsProps> = ({
	userDetails,
	likesReceived,
	likesGiven,
	postsMade,
	repliesReceived,
}) => {
	const router = useRouter();

	return (
		<div className={classes.container}>
			<UserBlock
				user={userDetails}
				button={
					<FollowButton
						userId={userDetails.userId || 0}
						isFollowing={!!userDetails.isFollowing}
					/>
				}
			/>
			<StatBlock
				count={userDetails.followerCount}
				heading="Followers"
				imageIcon={<FollowerIcon />}
			/>
			<StatBlock
				count={userDetails.followingCount}
				heading="Following"
				imageIcon={<FollowerIcon />}
			/>
			<StatBlock
				count={likesReceived}
				heading="Likes"
				imageIcon={<LikeIcon liked={true} />}
			/>
			<StatBlock
				count={likesGiven}
				heading="Likes Given"
				imageIcon={<LikeIcon liked={false} />}
			/>
			<StatBlock
				count={postsMade}
				heading="Posts Created"
				imageIcon={<CommentIcon fillColor="#492AA1" />}
			/>
			<StatBlock
				count={repliesReceived}
				heading="Replies Received"
				imageIcon={<CommentIcon fillColor="#492AA1" />}
			/>
		</div>
	);
};

export default Stats;
