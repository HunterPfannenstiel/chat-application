import { FunctionComponent } from "react";
import SignupForm from "../Resuable/SignupForm/Form";
import { NextRouter, useRouter } from "next/router";
import { formHandler } from "utils/form";

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
  async (name: string, handle: string, bio: string, image: Blob) => {
    const formData = formHandler({ name, handle, bio, image });
    try {
      const id = await createUser(formData);
      console.log("NEW USER ID", id);
      //Update JWT
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
  const data = (await res.json()) as { id: number };
  return data.id;
};

//Form handler
//Client side verification (all fields are present, handle is available)
//send POST request
//If !res.ok, get fields that are invalid and display message/highlight
//If res.ok, update token and send user to home page

export default SignUp;
