import { FC } from "react";
import { Dimensions } from "../../constants/Constants";
import { useTheme } from "../../store/SettingsStore/SettingsHooks";

export const NoNadesMessage: FC = () => {
  const { colors } = useTheme();

  return (
    <>
      <div className="no-nades-msg">
        <h3>No nades found</h3>
        <p>
          Maybe you know one?
          <br />
          Click the button + in the corner.
        </p>
      </div>
      <style jsx>{`
        .no-nades-msg {
          background: ${colors.DP00};
          border-radius: 5px;
          overflow: hidden;
          color: ${colors.TEXT};
          border: 1px solid ${colors.BORDER};
        }

        h3 {
          background: ${colors.DP01};
          padding: 10px ${Dimensions.GUTTER_SIZE}px;
          border-bottom: 1px solid ${colors.BORDER};
          margin: 0;
          font-size: 20px;
        }

        p {
          padding: 10px ${Dimensions.GUTTER_SIZE}px;
          margin: 0;
          font-size: 16px;
        }
      `}</style>
    </>
  );
};
