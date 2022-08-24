import { FC, memo } from "react";
import { Dimensions } from "../../constants/Constants";
import { useFilterReset } from "../logic/useFilterReset";
import { useTheme } from "../../core/settings/SettingsHooks";

export const NoNadesMessage: FC = memo(() => {
  const { resetFilter } = useFilterReset();
  const { colors } = useTheme();

  function onReset() {
    resetFilter();
  }

  return (
    <>
      <div className="no-nades-msg">
        <h3>No nades found</h3>
        <p>
          No nades found. Either none excist or try too{" "}
          <button className="reset" onClick={onReset}>
            reset filter
          </button>
        </p>
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
          padding: 0px ${Dimensions.GUTTER_SIZE}px ${Dimensions.GUTTER_SIZE}px
            ${Dimensions.GUTTER_SIZE}px;
          margin-top: ${Dimensions.GUTTER_SIZE}px;
        }

        h3 {
          background: ${colors.DP01};
          padding: 10px ${Dimensions.GUTTER_SIZE}px;
          border-bottom: 1px solid ${colors.BORDER};
          margin: 0;
          font-size: 18px;
          text-align: center;
          margin-left: -${Dimensions.GUTTER_SIZE}px;
          margin-right: -${Dimensions.GUTTER_SIZE}px;
        }

        p {
          padding: 0;
          margin: 0;
          margin-top: ${Dimensions.GUTTER_SIZE}px;
          font-size: 16px;
        }

        .reset {
          border-radius: ${Dimensions.BORDER_RADIUS};
          background: transparent;
          color: ${colors.primaryBtnBg};
          border: 1px solid ${colors.primaryBtnBg};
          padding: 4px;
          cursor: pointer;
          transition: background 0.2s;
          display: inline-block;
        }

        .reset:hover {
          background: ${colors.primaryBtnHover};
          color: white;
        }
      `}</style>
    </>
  );
});
