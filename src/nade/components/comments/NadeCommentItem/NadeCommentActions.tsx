import { FC } from "react";
import { useTheme } from "../../../../core/settings/useTheme";

export const NadeCommentActions: FC = ({ children }) => {
  const { colors } = useTheme();
  return (
    <>
      <div className="nade-comment-actions">{children}</div>
      <style jsx>{`
        .nade-comment-actions {
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
