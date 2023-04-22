// import { UserContext } from "@_types/user";
// import {
//   FunctionComponent,
//   ReactNode,
//   createContext,
//   useContext,
//   useEffect,
//   useState,
// } from "react";
// import { getInitialContext } from "./utils";

// const User = createContext<UserContext>(getInitialContext());

// const UserProvider: FunctionComponent<{ children: ReactNode }> = ({
//   children,
// }) => {
//   const [user, setUser] = useState(getInitialContext());
//   const [fetchUser, setFetchUser] = useState(true);
//   useEffect(() => {
//     if(fetchUser){
//         setFetchUser(false);
//         async () => {
//             const res = await fetch("/api/user")
//         }
//     }
//   }, [refetchUser]);
//   return <User.Provider value={user}>{children}</User.Provider>;
// };
