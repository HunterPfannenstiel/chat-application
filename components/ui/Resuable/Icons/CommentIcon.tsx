import { FunctionComponent } from "react";
import classes from "./CommentIcon.module.css";

interface CommentIconProps {
	filled?: boolean;
}

const CommentIcon: FunctionComponent<CommentIconProps> = ({ filled }) => {
	if (filled !== null && filled)
		return (
			<svg
				width="19"
				height="18"
				viewBox="0 0 19 18"
				fill="none"
			>
				<path
					d="M4.5095 14.7692L0.5 18V0.923077C0.5 0.678262 0.594821 0.443473 0.763604 0.270363C0.932387 0.0972524 1.16131 0 1.4 0H17.6C17.8387 0 18.0676 0.0972524 18.2364 0.270363C18.4052 0.443473 18.5 0.678262 18.5 0.923077V13.8462C18.5 14.091 18.4052 14.3258 18.2364 14.4989C18.0676 14.672 17.8387 14.7692 17.6 14.7692H4.5095ZM8.6 6.46154H5.9V8.30769H8.6V11.0769H10.4V8.30769H13.1V6.46154H10.4V3.69231H8.6V6.46154Z"
					fill="#5A3CD2"
				/>
			</svg>
		);
	else
		return (
			<svg width="18" height="18" viewBox="0 0 18 18" fill="none">
				<path
					d="M9.81818 2.4V4H1.63636V14.708L3.07882 13.6H14.7273V8H16.3636V14.4C16.3636 14.6122 16.2774 14.8157 16.124 14.9657C15.9706 15.1157 15.7625 15.2 15.5455 15.2H3.645L0 18V3.2C0 2.98783 0.086201 2.78434 0.23964 2.63431C0.393079 2.48429 0.601187 2.4 0.818182 2.4H9.81818ZM13.9091 2.4V0H15.5455V2.4H18V4H15.5455V6.4H13.9091V4H11.4545V2.4H13.9091Z"
					fill="#492AA2"
				/>
			</svg>
		);
};

export default CommentIcon;
