import { FunctionComponent, useRef } from "react";
import classes from "./Test.module.css";
import usePageFetch from "@hooks/page-fetch/usePageFetch";
import { useLoading } from "components/providers/Loading/Loading";

interface TestProps {}

const Test: FunctionComponent<TestProps> = () => {
  const { toggle } = useLoading();
  return <button onClick={toggle}>TOGGLE</button>;
};

export default Test;
