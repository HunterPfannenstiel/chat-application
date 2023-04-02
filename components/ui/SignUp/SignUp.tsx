import { FunctionComponent } from "react";
import classes from "./SignUp.module.css";

interface SignUpProps {}

const SignUp: FunctionComponent<SignUpProps> = () => {
  return (
    <section className={classes.sign_up}>
      <h1>PROFILE</h1>
      <form className={classes.form}>
        <fieldset>
          <label htmlFor="name">Choose a display name</label>
          <input type="text" id="name" />
        </fieldset>
        <fieldset>
          <label htmlFor="handle">Choose a handle</label>
          <input type="text" id="handle" />
        </fieldset>
        <fieldset className={classes.image_select}>
          <label htmlFor="image">Choose a profile picture</label>
          <div className={classes.image_selector}>
            <input type="file" id="image" />
          </div>
        </fieldset>
      </form>
    </section>
  );
};

export default SignUp;
