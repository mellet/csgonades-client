import { FC } from "react";
import { Dimensions } from "../constants/Constants";
import { useTheme } from "../core/settings/SettingsHooks";

export const Seperator: FC = ({}) => {
  const { colors } = useTheme();
  return (
    <>
      <hr />
      <style jsx>{`
        hr {
          width: 100%;
          border: none;
          border-bottom: 1px solid ${colors.BORDER};
          margin: ${Dimensions.GUTTER_SIZE}px 0px;
        }
      `}</style>
    </>
  );
};
