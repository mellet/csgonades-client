import { FC } from "react";
import { Dimensions } from "../../../../constants/Constants";
import { useTheme } from "../../../../core/settings/SettingsHooks";

export const NadeCommentLayout: FC = ({ children }) => {
  const { colors } = useTheme();
  return (
    <>
      <div>{children}</div>
      <style jsx>{`
        div {
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
