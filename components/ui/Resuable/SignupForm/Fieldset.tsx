import { FunctionComponent, InputHTMLAttributes } from "react";
import classes from "./Fieldset.module.css";

interface FieldsetProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  type: string;
  label: string;
}

const Fieldset: FunctionComponent<FieldsetProps> = ({
  id,
  type,
  label,
  ...rest
}) => {
  return (
    <fieldset className={classes.fieldset}>
      <label htmlFor={id}>{label}</label>
      <input type={type} id={id} {...rest} />
    </fieldset>
  );
};

export default Fieldset;
