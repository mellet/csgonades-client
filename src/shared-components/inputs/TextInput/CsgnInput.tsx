import { FC } from "react";
import { InputWrapper } from "./TextInputWrapper";
import { TextInputLabel } from "./TextInputLabel";
import { TextInputField } from "./TextInputField";

export type CsgnInputProps = {
  initialValue?: string;
  label?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  value?: string;
};

export const CsgnInput: FC<CsgnInputProps> = ({
  initialValue,
  label,
  onChange,
  placeholder,
  required,
  value,
}) => {
  return (
    <>
      <InputWrapper>
        <TextInputLabel label={label} required={required} />
        <TextInputField
          defaultValue={initialValue}
          onBlur={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          value={value}
        />
      </InputWrapper>
    </>
  );
};
