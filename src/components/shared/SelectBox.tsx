import { ChangeEventHandler } from "react";
import "./index.scss";

type Props = {
  options: any[];
  label?: string;
  id: string;
  name: string;
  onChange: ChangeEventHandler<HTMLSelectElement>;
  require?: boolean;
  value?: string;
};

const SelectBox = ({
  options,
  label,
  id,
  name,
  onChange,
  value,
  require = true,
}: Props) => {
  return (
    <div className={"select"}>
      <label htmlFor={id} className={"inputtext__inputlabel"}>
        {label} {require && <i style={{ color: "red" }}>*</i>}
      </label>
      <select
        name={name}
        id={id}
        className={`${"select__dropdown"} ${"inputtext__inputdiv__input"}`}
        onChange={onChange}
        defaultValue={value}
      >
        {options.map((item, index) => {
          return (
            <option key={index} value={item}>
              {item}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default SelectBox;
