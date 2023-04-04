import { FunctionComponent } from "react";
import classes from "./PlusIcon.module.css";

interface PlusProps {}

const Plus: FunctionComponent<PlusProps> = () => {
  return (
    <div className={classes.plus}>
      <div className={classes.vertical} />
      <div className={classes.horizontal} />
    </div>
  );
};

export default Plus;
