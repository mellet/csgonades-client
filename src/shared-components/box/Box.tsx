import { FC } from "react";
import { Dimensions } from "../../constants/Constants";
import { useTheme } from "../../core/settings/SettingsHooks";

export const Box: FC = ({ children }) => {
  const { colors } = useTheme();
  return (
    <>
      <div>{children}</div>
      <style jsx>{`
        div {
          padding: ${Dimensions.GUTTER_SIZE}px;
          background: ${colors.DP03};
          border: 1px solid ${colors.BORDER};
          border-radius: ${Dimensions.BORDER_RADIUS};
          color: ${colors.TEXT};
        }
      `}</style>
    </>
  );
};
