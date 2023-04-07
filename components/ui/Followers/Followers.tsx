import { FollowerDetails } from "@_types/user";
import { FunctionComponent } from "react";
import classes from "./Followers.module.css";
import ProfileImage from "@ui/Resuable/Profile/ProfileImage/ProfileImage";

interface FollowersProps {
	followers: FollowerDetails[];
}

const Followers: FunctionComponent<FollowersProps> = ({ followers }) => {
	console.log("followers", followers);
	return (
		<>
			{followers.map((follower) => {
				return (
					<div className={classes["follower-block"]}>
						<div className={classes["pfp-name-container"]}>
							<ProfileImage
								src={follower.userImage}
								className={classes["image-block"]}
							/>
							<div className={classes.name}>
								<p>{follower.userName}</p>
								<p>{`@${follower.userHandle}`}</p>
							</div>
							<button>Follow</button>
						</div>
						<div className={classes.description}>{follower.bio}</div>
					</div>
				);
			})}
		</>
	);
};

export default Followers;
