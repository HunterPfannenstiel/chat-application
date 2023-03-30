import { FunctionComponent, ReactNode } from "react";
import classes from "./EComponent.module.css";

interface EComponentProps {
  count: number;
  action: () => void;
  color: string;
  icon: ReactNode;
}

const EComponent: FunctionComponent<EComponentProps> = ({
  count,
  color,
  icon,
  action,
}) => {
  return (
    <div onClick={action} className={classes.engagement}>
      {icon}
      <span>{count}</span>
    </div>
  );
};

export default EComponent;
