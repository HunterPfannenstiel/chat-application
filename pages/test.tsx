import { FunctionComponent } from "react";
import { useLoading } from "components/providers/Loading/Loading";

interface TestProps {}

const Test: FunctionComponent<TestProps> = () => {
  const { toggle } = useLoading();
  return <button onClick={toggle}>TOGGLE</button>;
};

export default Test;
