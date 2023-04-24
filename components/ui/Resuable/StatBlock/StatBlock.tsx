import { FunctionComponent, ReactNode } from "react";
import classes from "./StatBlock.module.css";

interface StatBlockProps {
	count: number;
	heading: string;
	imageIcon?: ReactNode;
}

const StatBlock: FunctionComponent<StatBlockProps> = ({
	count,
	heading,
	imageIcon,
}) => {
	return (
		<div className={classes.stat_container}>
			{imageIcon && (
				<div className={classes.icon}>
					{imageIcon}
				</div>
			)}
			<p className={classes.count}>{count}</p>
			<p className={classes.heading}>{heading}</p>
		</div>
	);
};

export default StatBlock;
