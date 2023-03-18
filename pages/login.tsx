import { useSIWE } from "components/hooks/Web3/utils/exports";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { FunctionComponent } from "react";
import classes from "./Login.module.css";

interface LoginProps {}

const Login: FunctionComponent<LoginProps> = () => {
  const { signIn } = useSIWE();

  return <button onClick={signIn}>Login</button>;
};

export default Login;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession({ req: context.req });
  console.log(session);
  if (!session) {
    return { props: {} };
  } else {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
};
