import { FC } from "react";
import { useTheme } from "../../core/settings/SettingsHooks";

type Props = {
  onClick: () => void;
  title: string;
  disabled?: boolean;
};

export const Button: FC<Props> = ({ onClick, title, disabled }) => {
  const { colors } = useTheme();
  return (
    <>
      <button onClick={onClick} disabled={disabled}>
        {title}
      </button>
      <style jsx>{`
        button {
          border: none;
          outline: none;
          font-size: 18px;
          display: flex;
          background: ${colors.buttonBackground};
          color: white;
          font-size: 14px;
          font-weight: 500;
          padding: 6px 12px;
          border-radius: 3px;
        }

        button:hover {
          background: ${colors.buttonBackgroundHover};
          cursor: pointer;
        }

        button:disabled,
        button[disabled],
        button:disabled:hover,
        button[disabled]:hover {
          border: 1px solid #999999;
          background-color: #cccccc;
          color: #666666;
          cursor: not-allowed;
        }
      `}</style>
    </>
  );
};
