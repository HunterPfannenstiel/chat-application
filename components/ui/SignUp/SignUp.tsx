import { ChangeEvent, FormEvent, FunctionComponent, useState } from "react";
import classes from "./SignUp.module.css";
import PlusIcon from "@ui/Resuable/Icons/PlusIcon";
import Image from "next/image";
import Form from "../Resuable/SignupForm/Form";
import { NextRouter, useRouter } from "next/router";

interface SignUpProps {}

const SignUp: FunctionComponent<SignUpProps> = () => {
  const router = useRouter();
  return (
    <section className={classes.sign_up}>
      <h1>PROFILE</h1>
      <Form handler={formHandler(router)} buttonDisplay="Create Account" />
    </section>
  );
};

const formHandler =
  (router: NextRouter) =>
  async (name: string, handle: string, bio: string, image: Blob) => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("handle", handle);
    formData.append("bio", bio);
    formData.append("image", image);
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
