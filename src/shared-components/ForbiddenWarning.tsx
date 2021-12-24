import { FC } from "react";
import { Dimensions } from "../constants/Constants";
import { useTheme } from "../core/settings/SettingsHooks";

export const ForbiddenWarning: FC = () => {
  const { colors } = useTheme();
  return (
    <>
      <div className="forbidden">
        <h2>Forbidden</h2>
        <p>You are not allowed to access this page</p>
      </div>
      <style jsx>{`
        .forbidden {
          background: ${colors.DP03};
          color: ${colors.TEXT};
          border: 2px solid ${colors.ERROR};
          border-radius: ${Dimensions.BORDER_RADIUS};
          padding: ${Dimensions.PADDING_MEDIUM};
        }

        h2 {
          margin: 0;
          padding: 0;
          padding-bottom: ${Dimensions.PADDING_SMALL};
        }
      `}</style>
    </>
  );
};
