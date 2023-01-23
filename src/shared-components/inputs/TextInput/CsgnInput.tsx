import { FC } from "react";
import { TextInputField } from "./TextInputField";

export type CsgnInputProps = {
  initialValue?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  value?: string;
  maxLength?: number;
};

export const CsgnInput: FC<CsgnInputProps> = ({
  initialValue,
  onChange,
  placeholder,
  value,
  maxLength,
}) => {
  return (
    <>
      <div className="input-wrap">
        <div className="input">
          <TextInputField
            defaultValue={initialValue}
            onBlur={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            value={value}
            maxLength={maxLength}
          />
        </div>
      </div>
      <style jsx>{`
        .input-wrap {
          display: flex;
          flex-direction: row;
          position: relative;
          width: 100%;
        }

        .input {
          flex: 1;
        }

        button {
        }
      `}</style>
    </>
  );
};
