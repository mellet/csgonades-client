import { FC } from "react";
import { useTheme } from "../../../../core/settings/useTheme";

export const NadeCommentBody: FC = ({ children }) => {
  const { colors } = useTheme();
  return (
    <>
      <div className="nade-comment-body">{children}</div>
      <style jsx>{`
        .nade-comment-body {
          grid-area: body;
          background: ${colors.DP03};
          padding: 0px 16px;
        }
      `}</style>
    </>
  );
};
