import { FunctionComponent } from "react";
import classes from "./ClearSearchIcon.module.css";

interface ClearSearchIconProps {
	onClick?: () => void;
	className?: string;
}

const ClearSearchIcon: FunctionComponent<ClearSearchIconProps> = ({
	onClick,
	className,
}) => {
	return (
		<div onClick={onClick} className={className}>
			<svg width="22" height="23" viewBox="0 0 22 23" fill="none">
				<path
					d="M11 22.5C4.9247 22.5 0 17.5753 0 11.5C0 5.4247 4.9247 0.5 11 0.5C17.0753 0.5 22 5.4247 22 11.5C22 17.5753 17.0753 22.5 11 22.5ZM11 9.9446L7.8892 6.8327L6.3327 8.3892L9.4446 11.5L6.3327 14.6108L7.8892 16.1673L11 13.0554L14.1108 16.1673L15.6673 14.6108L12.5554 11.5L15.6673 8.3892L14.1108 6.8327L11 9.9446Z"
					fill="white"
				/>
			</svg>
		</div>
	);
};

export default ClearSearchIcon;
