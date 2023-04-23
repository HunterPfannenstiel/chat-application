import { FunctionComponent, useRef } from "react";
import classes from "./Test.module.css";
import usePageFetch from "@hooks/page-fetch/usePageFetch";

interface TestProps {}

const Test: FunctionComponent<TestProps> = () => {
  const { scrollElement } = usePageFetch();
  return (
    <div className={classes.container} ref={scrollElement}>
      <div className={classes.content} />
    </div>
  );
};

export default Test;
