import { FunctionComponent } from "react";
import classes from "./Stats.module.css";
import ProfileImage from "@ui/Resuable/Profile/ProfileImage/ProfileImage";
import StatBlock from "@ui/Resuable/StatBlock/StatBlock";
import { useRouter } from "next/router";
import LikeIcon from "@ui/Resuable/Icons/LikeIcon";
import FollowerIcon from "@ui/Resuable/Icons/FollowerIcon";
import CommentIcon from "@ui/Resuable/Icons/CommentIcon";

interface StatsProps {
	image: string;
	followerCount: number;
	followingCount: number;
	likesReceived: number;
	likesGiven: number;
	postsMade: number;
	repliesReceived: number;
}

const Stats: FunctionComponent<StatsProps> = ({
	image,
	followerCount,
	followingCount,
	likesReceived,
	likesGiven,
	postsMade,
	repliesReceived,
}) => {
	const router = useRouter();

	return (
		<div className={classes.container}>
			<h1>Happi's Statistics</h1>
			<div className={classes.pfp_handle}>
				<ProfileImage
					src={image}
					className={classes.pfp}
					onClick={() => {
						router.push({
							pathname: "/[handle]",
							query: { handle: router.query.handle },
						});
					}}
				/>
				<p>@happithemonkey</p>
			</div>
			<StatBlock
				count={followerCount}
				heading="Followers"
				imageIcon={<FollowerIcon />}
			/>
			<StatBlock
				count={followingCount}
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
