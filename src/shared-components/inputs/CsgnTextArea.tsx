import { FC } from "react";
import { useTheme } from "../../core/settings/useTheme";

type Props = {
  defaultValue?: string;
  label: string;
  onBlur?: (value: string) => void;
  onChange?: (value: string) => void;
  placeholder?: string;
  value?: string;
};

export const CsgnTextArea: FC<Props> = ({
  defaultValue,
  label,
  onBlur,
  onChange,
  placeholder,
  value,
}) => {
  const { colors } = useTheme();

  function onTABlur(e: any) {
    if (onBlur) {
      onBlur(e.target.value);
    }
  }

  function onTAChange(e: any) {
    if (onChange) {
      onChange(e.target.value);
    }
  }

  return (
    <>
      <div className="text-area-wrapper">
        <label>{label}</label>
        <textarea
          defaultValue={defaultValue}
          onBlur={onTABlur}
          onChange={onTAChange}
          placeholder={placeholder}
          value={value}
        />
      </div>
      <style jsx>{`
        label {
          color: ${colors.TEXT};
          font-size: 12px;
          font-weight: 500;
          margin-bottom: 5px;
          text-transform: uppercase;
        }

        .text-area-wrapper {
          color: ${colors.TEXT};
          display: flex;
          flex-direction: column;
        }

        textarea {
          background: ${colors.DP02};
          border-radius: 5px;
          border: 1px solid rgba(0, 0, 0, 0.15);
          color: ${colors.TEXT};
          min-height: 200px;
          outline: none;
          padding: 15px;
          resize: none;
        }

        textarea:focus {
          border: 1px solid ${colors.filterBgHover};
        }

        textarea::placeholder {
          color: #ccc;
          font-weight: 300;
        }
      `}</style>
    </>
  );
};
