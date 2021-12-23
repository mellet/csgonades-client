import { FC } from "react";
import { useTheme } from "../../../../core/settings/SettingsHooks";

export const NadeCommentArrow: FC = ({ children }) => {
  const { colors } = useTheme();
  return (
    <>
      <div>{children}</div>
      <style jsx>{`
        div {
          position: absolute;
          top: 16px;
          left: -8px;
          width: 0;
          height: 0;
          border-top: 8px solid transparent;
          border-bottom: 8px solid transparent;
          border-right: 8px solid ${colors.DP03};
        }
      `}</style>
    </>
  );
};
