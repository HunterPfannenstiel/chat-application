import { CSSProperties, FunctionComponent } from "react";
import classes from "./PlusIcon.module.css";

interface PlusProps {
  style?: CSSProperties;
}

const Plus: FunctionComponent<PlusProps> = ({ style }) => {
  return (
    <div>
      <div className={classes.plus} style={style}>
        <div className={classes.vertical} />
        <div className={classes.horizontal} />
      </div>
    </div>
  );
};

export default Plus;
