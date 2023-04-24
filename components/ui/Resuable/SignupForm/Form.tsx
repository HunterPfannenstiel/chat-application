import { FormEvent, FunctionComponent, useState } from "react";
import classes from "./Form.module.css";
import Fieldset from "./Fieldset";
import ImageInput from "./ImageInput";
import useValidHandle from "@hooks/profile/useValidHandle";

export type FormImage = { blob: Blob | null; imageUrl: string };

interface FormProps {
  handler: (
    name: string | undefined,
    handle: string | undefined,
    bio: string | undefined,
    image: FormImage | undefined
  ) => Promise<void>;
  initialInput?: { name: string; handle: string; bio: string; image: string };
  buttonDisplay: string;
}
const Form: FunctionComponent<FormProps> = ({
  handler,
  initialInput,
  buttonDisplay,
}) => {
  const [image, setImage] = useState<FormImage | undefined>({
    blob: null,
    imageUrl: initialInput?.image || "",
  });
  const { isValid, setHandle } = useValidHandle(initialInput?.handle);
  const [lockButton, setLockButton] = useState(false);
  const handleForm = async (e: FormEvent<HTMLElement>) => {
    e.preventDefault();
    console.log(e);
    if (e.target) {
      setLockButton(true);
      const target = e.target as any;
      console.log(e.target);
      let name = target[1].value;
      let handle = target[3].value;
      let bio = target[7].value;
      if (isFormValid({ name, handle, bio }) && (image || initialInput)) {
        if (initialInput) {
          name = initialInput.name !== name ? name : undefined;
          handle = initialInput.handle !== handle ? handle : undefined;
          bio = initialInput.bio !== bio ? bio : undefined;
        }
        try {
          await handler(name, handle, bio, image);
        } catch (error) {
          throw error;
        } finally {
          setLockButton(false);
        }
      } else {
        setLockButton(false);
      }
    }
  };
  console.log("Is valid", isValid);
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
          onChange={(e) => {
            setHandle(e.target.value);
          }}
          defaultValue={initialInput?.handle}
          isInputValid={isValid}
          invalidMessage="Handle already in use!"
          className={
            isValid === true
              ? classes.valid
              : isValid === false
              ? classes.invalid
              : ""
          }
        />
        <ImageInput onImageSelected={setImage} imageUrl={image?.imageUrl} />
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
        <button type="submit" disabled={lockButton}>
          {buttonDisplay}
        </button>
      </div>
    </form>
  );
};

const isFormValid = (input: { name: string; handle: string; bio: string }) => {
  if (!input.name || !input.handle || !input.bio) return false;
  return true;
};

export default Form;
