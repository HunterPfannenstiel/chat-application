import { FunctionComponent } from "react";
import classes from "./Stats.module.css";
import ProfileImage from "@ui/Resuable/Profile/ProfileImage/ProfileImage";
import StatBlock from "@ui/Resuable/StatBlock/StatBlock";
import { useRouter } from "next/router";
import LikeIcon from "@ui/Resuable/Icons/LikeIcon";
import FollowerIcon from "@ui/Resuable/Icons/FollowerIcon";
import CommentIcon from "@ui/Resuable/Icons/CommentIcon";

interface StatsProps {}

const Stats: FunctionComponent<StatsProps> = () => {
	const router = useRouter();

	return (
		<div className={classes.container}>
			<h1>Happi's Statistics</h1>
			<div className={classes.pfp_handle}>
				<ProfileImage
					src="https://upload.wikimedia.org/wikipedia/en/6/6a/Mike_Wazowski.png"
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
				count={3928210}
				heading="Followers"
				imageIcon={<FollowerIcon />}
			/>
			<StatBlock count={1} heading="Following" imageIcon={<FollowerIcon />} />
			<StatBlock
				count={84723}
				heading="Likes"
				imageIcon={<LikeIcon liked={true} />}
			/>
			<StatBlock
				count={1}
				heading="Likes Given"
				imageIcon={<LikeIcon liked={false} />}
			/>
			<StatBlock
				count={1}
				heading="Post"
				imageIcon={<CommentIcon fillColor="#492AA1" />}
			/>
			<StatBlock
				count={0}
				heading="Replies Given"
				imageIcon={<CommentIcon fillColor="#492AA1" />}
			/>
		</div>
	);
};

export default Stats;
