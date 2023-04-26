import { FunctionComponent } from "react";
import classes from "./FollowerIcon.module.css";

interface FollowerIconProps {
	filled?: boolean;
}

const FollowerIcon: FunctionComponent<FollowerIconProps> = ({ filled }) => {
	if (filled !== null && filled)
		return (
			<svg width="19" height="17" viewBox="0 0 19 17" fill="none">
				<path
					d="M0.5 17C0.5 15.2824 1.18961 13.6352 2.41712 12.4206C3.64463 11.2061 5.30949 10.5238 7.04545 10.5238C8.78142 10.5238 10.4463 11.2061 11.6738 12.4206C12.9013 13.6352 13.5909 15.2824 13.5909 17H0.5ZM7.04545 9.71429C4.33318 9.71429 2.13636 7.54071 2.13636 4.85714C2.13636 2.17357 4.33318 0 7.04545 0C9.75773 0 11.9545 2.17357 11.9545 4.85714C11.9545 7.54071 9.75773 9.71429 7.04545 9.71429ZM15.2273 12.9524H18.5V14.5714H15.2273V12.9524ZM12.7727 8.90476H18.5V10.5238H12.7727V8.90476ZM14.4091 4.85714H18.5V6.47619H14.4091V4.85714Z"
					fill="#5A3CD2"
				/>
			</svg>
		);
	else
		return (
			<svg
				width="19"
				height="17"
				viewBox="0 0 19 17"
				fill="none"
			>
				<path
					d="M14.4091 4.85714H18.5V6.47619H14.4091V4.85714ZM12.7727 8.90476H18.5V10.5238H12.7727V8.90476ZM15.2273 12.9524H18.5V14.5714H15.2273V12.9524ZM0.5 17C0.5 15.2824 1.18961 13.6352 2.41712 12.4206C3.64463 11.2061 5.30949 10.5238 7.04545 10.5238C8.78142 10.5238 10.4463 11.2061 11.6738 12.4206C12.9013 13.6352 13.5909 15.2824 13.5909 17H11.9545C11.9545 15.7118 11.4373 14.4764 10.5167 13.5655C9.59607 12.6546 8.34743 12.1429 7.04545 12.1429C5.74348 12.1429 4.49484 12.6546 3.5742 13.5655C2.65357 14.4764 2.13636 15.7118 2.13636 17H0.5ZM7.04545 9.71429C4.33318 9.71429 2.13636 7.54071 2.13636 4.85714C2.13636 2.17357 4.33318 0 7.04545 0C9.75773 0 11.9545 2.17357 11.9545 4.85714C11.9545 7.54071 9.75773 9.71429 7.04545 9.71429ZM7.04545 8.09524C8.85364 8.09524 10.3182 6.64619 10.3182 4.85714C10.3182 3.0681 8.85364 1.61905 7.04545 1.61905C5.23727 1.61905 3.77273 3.0681 3.77273 4.85714C3.77273 6.64619 5.23727 8.09524 7.04545 8.09524Z"
					fill="#5A3CD2"
				/>
			</svg>
		);
};

export default FollowerIcon;