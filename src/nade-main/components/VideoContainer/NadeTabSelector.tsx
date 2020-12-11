import { FC } from "react";
import { Dimensions } from "../../../constants/Constants";
import { useTheme } from "../../../store/SettingsStore/SettingsHooks";

type Props = {
  onChangeTab: (newTab: "video" | "lineup") => void;
  selectedTab: "video" | "lineup";
};

export const NadeTabSelector: FC<Props> = ({ selectedTab, onChangeTab }) => {
  const { colors } = useTheme();

  return (
    <>
      <div className="tab-selector">
        <button
          className={selectedTab === "video" ? "tab-btn selected" : "tab-btn"}
          onClick={() => onChangeTab("video")}
        >
          Video
        </button>
        <button
          className={selectedTab === "lineup" ? "tab-btn selected" : "tab-btn"}
          onClick={() => onChangeTab("lineup")}
        >
          Line Up
        </button>
      </div>
      <style jsx>{`
        .tab-selector {
          position: absolute;
          top: 16px;
          right: 16px;
          z-index: 1;
          display: flex;
          border-radius: 12px;
          background: ${colors.DP00};
          transition: all 0.2s;
          padding: 2px;
          overflow: hidden;
        }

        .tab-btn {
          background: ${colors.DP00};
          border: 1px solid transparent;
          cursor: pointer;
          outline: none;
          padding: 10px 16px;
          color: ${colors.TEXT};
          text-transform: uppercase;
          font-size: 14px;
          font-weight: 500;
          border-radius: 12px;
        }

        .tab-btn:hover {
          background: ${colors.DP01};
        }

        .selected {
          border: 1px solid ${colors.BORDER};
          background: ${colors.DP03};
          border-radius: 12px;
        }

        .selected:hover {
          background: ${colors.DP03};
        }

        @media only screen and (max-width: ${Dimensions.TABLET_THRESHHOLD}) {
          .tab-selector {
            position: absolute;
            top: 5px;
            left: 5px;
            right: auto;
          }

          .tab-btn {
            padding: 10px 10px;
          }
        }
      `}</style>
    </>
  );
};
