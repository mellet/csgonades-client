import { FC } from "react";
import { useTheme } from "../../core/settings/useTheme";

type Props = {
  onClick?: () => void;
  icon?: JSX.Element;
  href?: string;
  rel?: string;
};

export const Link: FC<Props> = ({ onClick, icon, href, rel, children }) => {
  const { colors } = useTheme();
  return (
    <>
      <a onClick={onClick} href={href} rel={rel}>
        {icon && <span className="icon">{icon}</span>}
        {<span>{children}</span>}
      </a>
      <style jsx>{`
        a {
          display: inline-flex;
          align-items: center;
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
