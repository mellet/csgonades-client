import { FC } from "react";
import { useTheme } from "../../../../core/settings/SettingsHooks";

export const NadeCommentBody: FC = ({ children }) => {
  const { colors } = useTheme();
  return (
    <>
      <div>{children}</div>
      <style jsx>{`
        div {
          grid-area: body;
          background: ${colors.DP03};
          padding: 0px 16px;
        }
      `}</style>
    </>
  );
};
