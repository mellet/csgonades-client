import { FC } from "react";
import { Dimensions } from "../../../../constants/Constants";
import { useTheme } from "../../../../core/settings/useTheme";

export const NadeCommentLayout: FC = ({ children }) => {
  const { colors } = useTheme();
  return (
    <>
      <div className="nade-comment-layout">{children}</div>
      <style jsx>{`
        .nade-comment-layout {
          display: grid;
          grid-template-columns: min-content 1fr min-content;
          grid-template-areas:
            "avatar username action"
            "avatar body body"
            "avatar time time";
          color: ${colors.TEXT};
          width: 100%;
          margin-bottom: ${Dimensions.GUTTER_SIZE}px;
        }
      `}</style>
    </>
  );
};
