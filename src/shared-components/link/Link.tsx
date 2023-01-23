import { FC } from "react";
import { useTheme } from "../../core/settings/SettingsHooks";

type Props = {
  onClick: () => void;
  title: string;
  icon: JSX.Element;
};

export const Link: FC<Props> = ({ onClick, icon, title }) => {
  const { colors } = useTheme();
  return (
    <>
      <a onClick={onClick}>
        {icon && <span className="icon">{icon}</span>}
        {<span>{title}</span>}
      </a>
      <style jsx>{`
        a {
          display: inline-flex;
          align-items: center;
          font-size: 16px;
          line-height: 16px;
          color: ${colors.link};
        }

        a:hover {
          color: ${colors.linkHover};
          text-decoration: underline;
          cursor: pointer;
        }

        .icon {
          margin-right: 6px;
          position: relative;
          top: 1px;
        }
      `}</style>
    </>
  );
};
