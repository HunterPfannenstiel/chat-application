import { FormEvent, FunctionComponent, useState } from "react";
import classes from "./Form.module.css";
import Fieldset from "./Fieldset";
import ImageInput from "./ImageInput";

interface FormProps {
  handler: (name: string, handle: string, bio: string, image: Blob) => void;
  initialInput?: { name: string; handle: string; bio: string; image: string };
  buttonDisplay: string;
}
const Form: FunctionComponent<FormProps> = ({
  handler,
  initialInput,
  buttonDisplay,
}) => {
  const [image, setImage] = useState<Blob | null>(null);
  const handleForm = async (e: FormEvent<HTMLElement>) => {
    e.preventDefault();
    console.log(e);
    if (e.target) {
      const target = e.target as any;
      console.log(e.target);
      const name = target[1].value;
      const handle = target[3].value;
      const bio = target[7].value;
      if (isFormValid({ name, handle, bio }) && image) {
        handler(name, handle, bio, image);
      }
    }
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
          defaultValue={initialInput?.name}
        />
        <Fieldset
          id="handle"
          type="text"
          label="Choose a handle"
          placeholder="@123user"
          required
          defaultValue={initialInput?.handle}
        />
        <ImageInput
          onImageSelected={setImage}
          initialImage={initialInput?.image}
        />
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
            defaultValue={initialInput?.bio}
          />
        </fieldset>
      </div>
      <div className={classes.create_account}>
        <button type="submit">{buttonDisplay}</button>
      </div>
    </form>
  );
};

const isFormValid = (input: { name: string; handle: string; bio: string }) => {
  if (!input.name || !input.handle || !input.bio) return false;
  return true;
};

export default Form;
