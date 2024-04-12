import {
  CSSProperties,
  ChangeEventHandler,
  TextareaHTMLAttributes,
} from "react";
import "./index.scss";
type Props = {
  onChange: ChangeEventHandler<HTMLTextAreaElement>;
  id: string;
  rows?: number;
  label?: string;
  placeholder?: string;
  name?: string;
  require?: boolean;
  value?: string;
  style?: CSSProperties;
};

const TextArea = ({
  onChange,
  id,
  name,
  label,
  placeholder,
  rows,
  require = true,
  value,
  style,
}: Props) => {
  return (
    <div className={"text-area"} style={style}>
      <label htmlFor="description" className={"inputtext__inputlabel"}>
        {label} {require && <i style={{ color: "red" }}>*</i>}
      </label>
      <textarea
        onChange={onChange}
        name={name}
        id={id}
        rows={rows}
        placeholder={placeholder}
        className={"inputtext__inputdiv__input"}
        value={value}
      />
    </div>
  );
};

export default TextArea;
