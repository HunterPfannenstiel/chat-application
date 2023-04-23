import { FunctionComponent, ReactNode } from "react";
import classes from "./UserBlock.module.css";
import { UserDetails } from "@_types/user";
import ProfileImage from "../Profile/ProfileImage/ProfileImage";
import { useRouter } from "next/router";
import UserBlockButton from "./UserBlockButton";

interface UserBlockProps {
	user: UserDetails;
	buttonText?: string;
	button?: ReactNode;
}

const UserBlock: FunctionComponent<UserBlockProps> = ({
	user,
	buttonText,
	button,
}) => {
	const router = useRouter();

	return (
		<div className={classes["user-block"]}>
			<div className={classes["pfp-name-container"]}>
				<ProfileImage
					src={user.userImage}
					circleDiameter="3rem"
					onClick={() => {
						router.push(`/${user.userHandle}`);
					}}
				/>
				<div className={classes.name}>
					<p>{user.userName}</p>
					<p>{`@${user.userHandle}`}</p>
				</div>
			</div>
			<p>{user.bio}</p>
			<div className={classes["follow-container"]}>
				<p>
					<span>{user.followingCount}</span> Following
				</p>
				<p>
					<span>{user.followerCount}</span> Followers
				</p>
				{!button && buttonText && <UserBlockButton buttonText={buttonText} />}
				{button}
			</div>
		</div>
	);
};

export default UserBlock;
