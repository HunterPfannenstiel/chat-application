import { useQuery } from "@tanstack/react-query";
import { UserProfile } from "@_types/user/profile";
import { useRouter } from "next/router";

const useProfile = () => {
  const router = useRouter();
  let handle = "";
  if (router.query.handle) {
    handle = router.query.handle as string;
  }
  console.log("ROUTER", router.query);
  const { data, isLoading, error } = useQuery({
    queryKey: ["profile", handle],
    queryFn: fetchProfile.bind(null, handle),
  });

  return { profile: data, isLoading, error };
};

type Profile = { user: UserProfile; isUsersProfile: boolean };

const fetchProfile = async (
  userId: string | undefined
): Promise<Profile | null> => {
  if (userId) {
    const res = await fetch(`/api/user/${userId}`);
    if (res.ok) {
      const data = (await res.json()) as Profile;
      return data;
    } else {
      throw new Error("No profile found");
    }
  }
  console.log("undef");
  return null;
};

export default useProfile;
