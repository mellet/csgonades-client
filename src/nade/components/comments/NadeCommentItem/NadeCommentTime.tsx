import { FC } from "react";
import { useTheme } from "../../../../core/settings/SettingsHooks";

export const NadeCommentTime: FC = ({ children }) => {
  const { colors } = useTheme();
  return (
    <>
      <div className="nade-comment-time">{children}</div>
      <style jsx>{`
        .nade-comment-time {
          grid-area: time;
          color: ${colors.GREY};
          font-size: 12px;
          background: ${colors.DP03};
          padding: 16px 16px 8px 16px;
          border-bottom-right-radius: 8px;
          border-bottom-left-radius: 8px;
        }
      `}</style>
    </>
  );
};
