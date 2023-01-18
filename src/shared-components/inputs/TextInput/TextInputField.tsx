import { DetailedHTMLProps, FC, InputHTMLAttributes } from "react";
import { useTheme } from "../../../core/settings/SettingsHooks";

type Props = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

export const TextInputField: FC<Props> = (props) => {
  const { colors } = useTheme();
  return (
    <>
      <input {...props} />
      <style jsx>{`
        input {
          background: ${colors.DP02};
          border-radius: 5px;
          border: 1px solid ${colors.BORDER};
          color: ${colors.TEXT};
          outline: none;
          padding: 10px 12px;
          height: 40px;
          width: 100%;
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
