import { CSSProperties, useCallback, useMemo, useState } from "react";
import "./index.scss";

type Props = {
  id: string;
  label?: string;
  inputType?: string;
  placeHolder?: string;
  warning?: string;
  password?: boolean;
  require?: boolean;
  width?: string;
  minLength?: number;
  maxLength?: number;
  onChange: Function;
  value?: any;
  filename?: any;
  style?: CSSProperties;
  inputTextStyle?: CSSProperties;
  fileloading?: boolean;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  autoComplete?: "on" | "off";
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
};

const InputText = ({
  id,
  label,
  inputType,
  placeHolder,
  warning,
  password,
  require = true,
  width,
  minLength = 0,
  maxLength = 500,
  onChange,
  value,
  filename,
  style,
  onBlur,
  fileloading = false,
  inputTextStyle,
  autoComplete = "on",
  onKeyDown,
}: Props) => {
  const [type, setType] = useState<string>(inputType || "text");

  //Validating email if type is email
  const validateEmail = (email: string) => {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  };

  const onInputChangeHandler = useCallback(
    (e: any) => {
      if (
        e.target.value.toString().length < minLength ||
        e.target.value.toString().length > maxLength
      ) {
        onChange(id, null);
      } else {
        if (type === "email") {
          if (validateEmail(e.target.value)) {
            onChange(id, e.target.value);
          } else {
            onChange(id, null);
          }
        } else {
          onChange(id, e.target.value);
        }
      }
    },
    [type]
  );

  const renderEyeButton = useMemo(() => {
    if (type === "password") {
      return (
        <i
          className={`${"eyediv"} ${"ri-eye-off-line"}`}
          onClick={() => setType("text")}
        />
      );
    } else {
      return (
        <i
          className={`${"eyediv"} ${"ri-eye-line"}`}
          onClick={() => setType("password")}
        />
      );
    }
  }, [type]);
  return (
    <div className={"inputtext"} style={inputTextStyle}>
      <label className={"inputtext__inputlabel"} htmlFor={id}>
        {label} {require && <i style={{ color: "red" }}>*</i>}
      </label>
      <div className={"inputtext__inputdiv"}>
        <input
          onBlur={onBlur}
          className={"inputtext__inputdiv__input"}
          value={value}
          type={type}
          name={id}
          placeholder={placeHolder}
          id={id}
          required={require ?? true}
          onChange={onInputChangeHandler}
          // style={{
          //   width: `${width ? `calc(${width} - 34px)` : "calc(100% - 34px)"}`,
          //   borderStyle: `${type === "file" ? "dashed" : "solid"}`,
          //   ...style,
          // }}
          minLength={minLength}
          maxLength={maxLength}
          autoComplete={autoComplete}
          onKeyDown={onKeyDown}
        />
        {password && renderEyeButton}
      </div>
      <span className={"inputtext__warning"}>{warning}</span>
    </div>
  );
};

export default InputText;
