import { FunctionComponent } from "react";
import classes from "./StatsPage.module.css";
import Stats from "@ui/Stats/Stats";

interface StatsPageProps {}

const StatsPage: FunctionComponent<StatsPageProps> = () => {
	return <Stats />;
};

export default StatsPage;
