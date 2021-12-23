import { FC } from "react";
import { useTheme } from "../../../../core/settings/SettingsHooks";

export const NadeCommentActions: FC = ({ children }) => {
  const { colors } = useTheme();
  return (
    <>
      <div>{children}</div>
      <style jsx>{`
        div {
          grid-area: action;
          padding: 0px 0px 0px 0px;
          padding-top: 8px;
          padding-right: 8px;
          background: ${colors.DP03};
          border-top-right-radius: 8px;
          overflow: hidden;
        }
      `}</style>
    </>
  );
};
