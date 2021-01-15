import { FC, memo } from "react";
import { Dimensions } from "../../constants/Constants";
import { useFilterReset } from "../data/hooks/useFilterReset";
import { useTheme } from "../../core/settings/SettingsHooks";

export const NoNadesMessage: FC = memo(() => {
  const { resetFilter } = useFilterReset();
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
        <button className="reset" onClick={resetFilter}>
          Reset Filter
        </button>
      </div>
      <style jsx>{`
        .no-nades-msg {
          background: ${colors.DP00};
          border-radius: 5px;
          overflow: hidden;
          color: ${colors.TEXT};
          border: 1px solid ${colors.BORDER};
          display: flex;
          flex-direction: column;
        }

        h3 {
          background: ${colors.DP01};
          padding: 10px ${Dimensions.GUTTER_SIZE}px;
          border-bottom: 1px solid ${colors.BORDER};
          margin: 0;
          font-size: 20px;
          text-align: center;
        }

        p {
          padding: 10px ${Dimensions.GUTTER_SIZE}px;
          margin: 0;
          font-size: 16px;
        }

        .reset {
          margin: ${Dimensions.GUTTER_SIZE}px;
          border-radius: ${Dimensions.BORDER_RADIUS};
          background: ${colors.primaryBtnBg};
          color: white;
          border: none;
          padding: 10px 16px;
          cursor: pointer;
          transition: background 0.2s;
        }

        .reset:hover {
          background: ${colors.primaryBtnHover};
        }
      `}</style>
    </>
  );
});
