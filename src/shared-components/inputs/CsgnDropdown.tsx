import { useState } from "react";
import { DropdownProps, Dropdown } from "semantic-ui-react";

type Props<T> = {
  defaultValue?: T;
  onChange: (newValue: T) => void;
  options: any;
};

export function CsgnDropdown<T>(props: Props<T>) {
  const [value, setValue] = useState<any>(props.defaultValue);

  function onChange(_: any, data: DropdownProps) {
    const value = data.value as any;
    setValue(value);
    props.onChange(value);
  }

  return (
    <>
      <Dropdown
        fluid
        onChange={onChange}
        options={props.options}
        placeholder="Select..."
        selection
        value={value}
      />
    </>
  );
}
