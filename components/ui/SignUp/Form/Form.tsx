import { FormEvent, FunctionComponent, useState } from "react";
import classes from "./Form.module.css";
import Fieldset from "./Fieldset";
import ImageInput from "./ImageInput";
import { useRouter } from "next/router";

interface FormProps {}
const Form: FunctionComponent<FormProps> = () => {
  const router = useRouter();
  const [image, setImage] = useState<Blob | null>(null);
  const handleForm = async (e: FormEvent<HTMLElement>) => {
    e.preventDefault();
    console.log(e);
    if (e.target) {
      const target = e.target as any;
      const name = target[1].value;
      const handle = target[3].value;
      const bio = target[7].value;
      if (isFormValid({ name, handle, bio }) && image) {
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
      }
    }
    console.log("Submitted");
  };
  return (
    <form className={classes.form} onSubmit={handleForm}>
      <div className={classes.form_content}>
        <Fieldset
          id="name"
          type="text"
          label="Choose a display name"
          placeholder="user123"
          required
        />
        <Fieldset
          id="handle"
          type="text"
          label="Choose a handle"
          placeholder="@123user"
          required
        />
        <ImageInput onImageSelected={setImage} />
        <fieldset>
          <label htmlFor="description">Describe Yourself</label>
          <textarea
            cols={1}
            rows={10}
            maxLength={280}
            placeholder="I am new and ready to chat!"
            id="description"
            className={classes.description}
            required
          />
        </fieldset>
      </div>
      <div className={classes.create_account}>
        <button>Create Account</button>
      </div>
    </form>
  );
};

const isFormValid = (input: { name: string; handle: string; bio: string }) => {
  if (!input.name || !input.handle || !input.bio) return false;
  return true;
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

export default Form;
