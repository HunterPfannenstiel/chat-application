import { FunctionComponent } from "react";
import classes from "./UserBlockButton.module.css";

interface UserBlockButtonProps {
	buttonText: string;
    onClick?: () => {}
}

const UserBlockButton: FunctionComponent<UserBlockButtonProps> = ({
	buttonText,
    onClick
}) => {
	return <button className={classes["button"]} onClick={onClick}>{buttonText}</button>;
};

export default UserBlockButton;
