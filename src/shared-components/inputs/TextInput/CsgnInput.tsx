import { FC } from "react";
import { TextInputLabel } from "./TextInputLabel";
import { TextInputField } from "./TextInputField";

export type CsgnInputProps = {
  initialValue?: string;
  label?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  value?: string;
  maxLength?: number;
};

export const CsgnInput: FC<CsgnInputProps> = ({
  initialValue,
  label,
  onChange,
  placeholder,
  required,
  value,
  maxLength,
}) => {
  return (
    <>
      <div className="input-wrap">
        <TextInputLabel label={label} required={required} />
        <TextInputField
          defaultValue={initialValue}
          onBlur={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          value={value}
          maxLength={maxLength}
        />
      </div>
      <style jsx>{`
        .input-wrap {
          display: flex;
          flex-direction: column;
        }
      `}</style>
    </>
  );
};
