import { UserDetails } from "@_types/user";
import {
  FunctionComponent,
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { getInitialContext } from "./utils";

const User = createContext<UserDetails>(getInitialContext());

const UserProvider: FunctionComponent<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState(getInitialContext());
  const [fetchUser, setFetchUser] = useState(true);
  useEffect(() => {
    if (fetchUser) {
      setFetchUser(false);
      const fetchDetails = async () => {
        const res = await fetch("/api/user");
        if (res.ok) {
          const data = await res.json();
          setUser(data.userDetails || getInitialContext());
        }
      };
      fetchDetails();
    }
  }, [fetchUser]);
  return <User.Provider value={user}>{children}</User.Provider>;
};

export default UserProvider;

export const useUserDetails = () => {
  const userDetails = useContext(User);
  return userDetails;
};
