import {
  FunctionComponent,
  InputHTMLAttributes,
  useEffect,
  useRef,
} from "react";
import classes from "./Fieldset.module.css";

interface FieldsetProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  type: string;
  label: string;
  isInputValid?: boolean;
  invalidMessage?: string;
}

const Fieldset: FunctionComponent<FieldsetProps> = ({
  id,
  type,
  label,
  isInputValid,
  invalidMessage,
  ...rest
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (isInputValid !== undefined) {
      if (!isInputValid && inputRef) {
        inputRef.current?.setCustomValidity(invalidMessage || "");
        inputRef.current?.reportValidity();
      } else if (inputRef) {
        inputRef.current?.setCustomValidity("");
      }
    }
  }, [isInputValid]);
  return (
    <fieldset className={classes.fieldset}>
      <label htmlFor={id}>{label}</label>
      <input type={type} id={id} ref={inputRef} {...rest} />
    </fieldset>
  );
};

export default Fieldset;
