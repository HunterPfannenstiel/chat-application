import {
  FunctionComponent,
  ReactNode,
  Reducer,
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import {
  UserContext,
  getInitialContext,
  getInitialUser,
  initializeUser,
} from "./utils";
import { UserDetails } from "@_types/user";

const userReducer: Reducer<UserDetails, (state: UserDetails) => UserDetails> = (
  state,
  action
) => {
  console.log("dispatch");
  return action(state);
};

const User = createContext<UserContext>(getInitialContext());

const UserProvider: FunctionComponent<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, dispatchUser] = useReducer(userReducer, getInitialUser());
  const [isLoading, setIsLoading] = useState(true);
  const [fetchUser, setFetchUser] = useState(true);
  useEffect(() => {
    if (fetchUser) {
      setFetchUser(false);
      const fetchDetails = async () => {
        const res = await fetch("/api/user");
        if (res.ok) {
          const data = await res.json();
          dispatchUser(initializeUser(data.userDetails));
        }
        setIsLoading(false);
      };
      fetchDetails();
    }
  }, [fetchUser]);
  return (
    <User.Provider value={{ ...user, isLoading }}>{children}</User.Provider>
  );
};

export default UserProvider;

export const useUserDetails = () => {
  const userDetails = useContext(User);
  return userDetails;
};
