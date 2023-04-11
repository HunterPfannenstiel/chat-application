import { ChangeEvent, FormEvent, FunctionComponent, useState } from "react";
import classes from "./SignUp.module.css";
import PlusIcon from "@ui/Resuable/Icons/PlusIcon";
import Image from "next/image";
import Form from "./Form/Form";

interface SignUpProps {}

const SignUp: FunctionComponent<SignUpProps> = () => {
  return (
    <section className={classes.sign_up}>
      <h1>PROFILE</h1>
      <Form />
    </section>
  );
};

//Form handler
//Client side verification (all fields are present, handle is available)
//send POST request
//If !res.ok, get fields that are invalid and display message/highlight
//If res.ok, update token and send user to home page

export default SignUp;
