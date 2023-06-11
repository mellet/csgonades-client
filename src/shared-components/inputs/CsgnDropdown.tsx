import { ChangeEventHandler, useState } from "react";
import { useTheme } from "../../core/settings/useTheme";

type Option = {
  key: any;
  text: any;
  value: any;
};

type Props<T> = {
  defaultValue?: T;
  onChange: (newValue: T) => void;
  options: Option[];
  hintText: string;
};

export function CsgnDropdown<T>(props: Props<T>) {
  const { colors } = useTheme();
  const [value, setValue] = useState<T | undefined>(props.defaultValue);

  const onSelectChange: ChangeEventHandler<HTMLSelectElement> = (e) => {
    const newValue = e.target.value as any;
    setValue(newValue);
    props.onChange(newValue);
  };

  return (
    <>
      <select onChange={onSelectChange}>
        <option disabled selected>
          {props.hintText}
        </option>
        {props.options.map((option) => (
          <option
            key={option.key}
            value={option.value}
            selected={value === option.value}
          >
            {option.text}
          </option>
        ))}
      </select>
      <style jsx>{`
        select {
          width: 100%;
          background: ${colors.DP02};
          border-radius: 5px;
          border: 1px solid ${colors.BORDER};
          color: ${colors.TEXT};
          outline: none;
          padding: 10px 12px;
          height: 40px;
        }
      `}</style>
    </>
  );
}
