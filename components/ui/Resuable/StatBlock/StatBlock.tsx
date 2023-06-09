import { FunctionComponent, ReactNode } from "react";
import classes from "./StatBlock.module.css";

interface StatBlockProps {
  headings: string[];
  counts: number[];
  imageIcons: ReactNode[];
}

const StatBlock: FunctionComponent<StatBlockProps> = ({
  headings,
  counts,
  imageIcons,
}) => {
  return (
    <div className={classes.container}>
      <div className={classes.names}>
        {headings.map((heading) => (
          <p key={heading}>{heading}</p>
        ))}
      </div>
      <div className={classes.counts}>
        {counts.map((count, i) => (
          <p key={i}>{count}</p>
        ))}
      </div>
      <div className={classes.icons}>{imageIcons.map((icon) => icon)}</div>
    </div>
  );
};

export default StatBlock;
