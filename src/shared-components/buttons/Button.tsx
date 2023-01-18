import { FC } from "react";
import { useTheme } from "../../core/settings/SettingsHooks";

type Props = {
  onClick: () => void;
  title?: string | JSX.Element;
  disabled?: boolean;
  icon?: JSX.Element;
  primary?: boolean;
};

export const Button: FC<Props> = ({
  onClick,
  title,
  disabled,
  icon,
  primary,
}) => {
  const { colors } = useTheme();
  return (
    <>
      <button onClick={onClick} disabled={disabled}>
        {Boolean(title) && <span className="title">{title}</span>}
        {Boolean(icon) && <span className="icon">{icon}</span>}
      </button>
      <style jsx>{`
        button {
          border: none;
          outline: none;
          display: flex;
          align-items: center;
          background: ${primary ? colors.buttonPrimaryBg : "transparent"};
          color: ${primary ? "white" : colors.TEXT};
          font-size: 16px;
          line-height: 16px;
          font-weight: 500;
          padding: 0;
          border-radius: 3px;
          border: ${primary
            ? "1px solid transparent"
            : `1px solid ${colors.BORDER}`};
        }

        .icon {
          padding: 8px;
          border-left: ${title ? `1px solid ${colors.BORDER}` : "none"};
        }

        .title {
          padding: 8px 16px;
          display: flex;
          align-items: center;
        }

        button:hover {
          background: ${primary ? colors.buttonBgHover : colors.DP03};
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
