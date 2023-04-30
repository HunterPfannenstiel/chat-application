import { UserDetails } from "@_types/user";
import { FormImage } from "@ui/Resuable/SignupForm/Form";
import { useUserDetails } from "components/providers/User/User";
import { updateDetails } from "components/providers/User/utils";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction } from "react";
import { createFormData } from "utils/form";

const useUpdateUser = (
  setUpdatedUser: Dispatch<SetStateAction<UserDetails | undefined>>
) => {
  const { dispatchUser } = useUserDetails(); //User context
  const router = useRouter();
  const handleForm = async (
    name: string | undefined,
    handle: string | undefined,
    bio: string | undefined,
    image: FormImage | undefined
  ): Promise<void> => {
    const formData = createFormData({
      userName: name || null,
      userHandle: handle || null,
      bio: bio || null,
      image: image?.blob || null,
    });
    const res = await fetch("/api/user/create", {
      method: "PUT",
      body: formData,
    });
    if (res.ok) {
      const data = await res.json();
      setUpdatedUser((prevState) => {
        const newUser: UserDetails & { imageUrl?: string } = {
          ...prevState!,
          userHandle: handle || prevState!.userHandle,
          userName: name || prevState!.userName,
          userImage: image?.imageUrl || prevState!.userImage,
          bio: bio || prevState!.bio,
        };
        newUser.imageUrl = image?.imageUrl;
        return newUser;
      });
      dispatchUser(
        updateDetails({
          userHandle: handle,
          userName: name,
          bio,
          imageUrl: image?.imageUrl,
        })
      );
      if (handle) router.push(`/${handle}`);
    }
    if (!res.ok) {
      console.log("Update user error!");
    }
  };
  return handleForm;
};

export default useUpdateUser;
