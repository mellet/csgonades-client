import { FC } from "react";
import { useTheme } from "../../store/SettingsStore/SettingsHooks";
import { FaStarOfLife } from "react-icons/fa";
import { Popup } from "semantic-ui-react";

type Props = {
  initialValue?: string;
  label?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  value?: string;
};

export const CsgnInput: FC<Props> = ({
  initialValue,
  label,
  onChange,
  placeholder,
  required,
  value,
}) => {
  const { colors } = useTheme();

  return (
    <>
      <div className="input-wrapper">
        {!!label && (
          <label>
            {label}{" "}
            {!!required && (
              <Popup
                content="Required"
                inverted
                position="top center"
                size="tiny"
                trigger={
                  <span className="req">
                    <FaStarOfLife />
                  </span>
                }
              />
            )}
          </label>
        )}
        <input
          defaultValue={initialValue}
          onBlur={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          value={value}
        />
      </div>
      <style jsx>{`
        .input-wrapper {
          display: flex;
          flex-direction: column;
        }

        .req {
          color: red;
          display inline-block;
          font-size: 6px;
          margin: 0;
          padding: 0;
          position: relative;
          top: -4px;
        }

        label {
          color: ${colors.TEXT};
          font-size: 12px;
          font-weight: 500;
          margin-bottom: 5px;
          text-transform: uppercase;
        }

        input {
          background: ${colors.DP03};
          border-radius: 5px;
          border: 1px solid rgba(0, 0, 0, 0.15);
          color: ${colors.TEXT};
          height: 43px;
          outline: none;
          padding: 11px 16px;
        }

        input:focus {
          border: 1px solid ${colors.filterBgHover};
        }

        input::placeholder {
          color: #ccc;
          font-weight: 300;
        }
      `}</style>
    </>
  );
};
