import { FunctionComponent } from "react";
import classes from "./UserBlock.module.css";
import { FollowerDetails } from "@_types/user";
import ProfileImage from "../Profile/ProfileImage/ProfileImage";
import { useRouter } from "next/router";
import UserBlockButton from "./UserBlockButton";

interface UserBlockProps {
	user: FollowerDetails;
	buttonText?: string;
}

const UserBlock: FunctionComponent<UserBlockProps> = ({ user, buttonText }) => {
	const router = useRouter();

	return (
		<div className={classes["user-block"]}>
			<ProfileImage
				src={user.userImage}
				className={classes["image-block"]}
				circleDiameter="4rem"
				onClick={() => {
					router.push(`/${user.userHandle}`);
				}}
			/>
			<div className={classes["name-button"]}>
				<div className={classes.name}>
					<p>{user.userName}</p>
					<p>{`@${user.userHandle}`}</p>
				</div>
				{buttonText && <UserBlockButton buttonText={buttonText} />}
			</div>
			<div className={classes.description}>{user.bio}</div>
		</div>
	);
};

export default UserBlock;
