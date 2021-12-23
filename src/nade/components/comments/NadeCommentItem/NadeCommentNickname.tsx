import { FC } from "react";
import { useTheme } from "../../../../core/settings/SettingsHooks";

export const NadeCommentNickname: FC = ({ children }) => {
  const { colors } = useTheme();

  return (
    <>
      <div>{children}</div>
      <style jsx>{`
        div {
          position: relative;
          grid-area: username;
          color: ${colors.TEXT};
          font-weight: 400;
          padding: 16px 16px 8px 16px;
          border-top-left-radius: 8px;
          background: ${colors.DP03};
        }
      `}</style>
    </>
  );
};