import { FC } from "react";
import { useTheme } from "../../../../core/settings/useTheme";

export const NadeCommentArrow: FC = ({ children }) => {
  const { colors } = useTheme();
  return (
    <>
      <div className="nade-comment-arrow">{children}</div>
      <style jsx>{`
        .nade-comment-arrow {
          position: absolute;
          top: 20px;
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
