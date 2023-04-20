import { FunctionComponent } from "react";
import classes from "./CommentIcon.module.css";

interface CommentIconProps {
	fillColor: string;
}

const CommentIcon: FunctionComponent<CommentIconProps> = ({ fillColor }) => {
	return (
		<svg
			width="18"
			height="18"
			viewBox="0 0 18 18"
			fill="none"
		>
			<path
				d="M9.81818 2.4V4H1.63636V14.708L3.07882 13.6H14.7273V8H16.3636V14.4C16.3636 14.6122 16.2774 14.8157 16.124 14.9657C15.9706 15.1157 15.7625 15.2 15.5455 15.2H3.645L0 18V3.2C0 2.98783 0.086201 2.78434 0.23964 2.63431C0.393079 2.48429 0.601187 2.4 0.818182 2.4H9.81818ZM13.9091 2.4V0H15.5455V2.4H18V4H15.5455V6.4H13.9091V4H11.4545V2.4H13.9091Z"
				fill="#492AA2"
			/>
		</svg>
	);
};

export default CommentIcon;
