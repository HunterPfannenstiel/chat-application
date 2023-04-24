import { UserDetails } from "@_types/user";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const useUserDetails = () => {
  const { handle } = useRouter().query;
  const [user, setUser] = useState<UserDetails>();
  const [isUsersProfile, setIsUsersProfile] = useState<boolean>();

  useEffect(() => {
    if (typeof handle === "string") {
      const fetchUser = async () => {
        const res = await fetch(`/api/user/profile?handle=${handle}`);
        if (res.ok) {
          const user = (await res.json()) as {
            user: UserDetails;
            isUsersProfile: boolean;
          };
          setUser(user.user);
          setIsUsersProfile(user.isUsersProfile);
        } else {
          console.log("ERROR");
        }
      };
      fetchUser();
    }
  }, [handle]);

  return { user, isUsersProfile, setUser };
};

export default useUserDetails;
