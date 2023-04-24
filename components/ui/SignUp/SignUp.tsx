import { FunctionComponent } from "react";
import SignupForm, { FormImage } from "../Resuable/SignupForm/Form";
import { NextRouter, useRouter } from "next/router";
import { createFormData } from "utils/form";

interface SignUpProps {}

const SignUp: FunctionComponent<SignUpProps> = () => {
  const router = useRouter();
  return (
    <section>
      <h1>PROFILE</h1>
      <SignupForm handler={handleForm(router)} buttonDisplay="Create Account" />
    </section>
  );
};

const handleForm =
  (router: NextRouter) =>
  async (
    name: string | undefined,
    handle: string | undefined,
    bio: string | undefined,
    image: FormImage | undefined
  ) => {
    const formData = createFormData({ name, handle, bio, image: image?.blob });
    try {
      const id = await createUser(formData);
      router.push("/");
    } catch (error) {
      console.log("ERROR SUBMITTING USER");
    }
  };

const createUser = async (formData: FormData) => {
  const res = await fetch("/api/user/create", {
    method: "POST",
    body: formData,
  });
  if (!res.ok) {
    throw new Error("Error creating user!");
  }
  await fetch("/api/auth/session?createUser=true");
  const data = (await res.json()) as { id: number };
  return data.id;
};

export default SignUp;
