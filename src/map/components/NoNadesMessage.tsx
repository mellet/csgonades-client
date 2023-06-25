import { FC, memo } from "react";
import { Dimensions } from "../../constants/Constants";
import { useFilterReset } from "../logic/useFilterReset";
import { useTheme } from "../../core/settings/useTheme";
import { Link } from "../../shared-components/link/Link";

export const NoNadesMessage: FC = memo(() => {
  const { resetFilter } = useFilterReset();
  const { colors } = useTheme();

  function onReset() {
    resetFilter();
  }

  return (
    <>
      <div className="no-nades-msg">
        <p>
          <b>We can&apos;t find any nades 😟</b>
          <br />
          <br />
          Either no nades have been added or you can try{" "}
          <Link onClick={onReset}>resetting the filter.</Link>
        </p>
      </div>
      <style jsx>{`
        .no-nades-msg {
          color: white;
          display: flex;
          flex-direction: column;
          text-align: center;
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
