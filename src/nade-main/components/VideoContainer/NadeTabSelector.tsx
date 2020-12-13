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
        <div className="selected-bg"></div>
        <button
          className={selectedTab === "video" ? "selected-btn" : "tab-btn"}
          onClick={() => onChangeTab("video")}
        >
          Video
        </button>
        <button
          className={selectedTab === "lineup" ? "selected-btn" : "tab-btn"}
          onClick={() => onChangeTab("lineup")}
        >
          Line Up
        </button>
      </div>
      <style jsx>{`
        .tab-selector {
          position: absolute;
          top: 10px;
          right: 10px;
          z-index: 1;
          display: flex;
          border-radius: 5px;
          background: ${colors.DP00};
          transition: all 0.2s;
          padding: 2px;
          overflow: hidden;
          width: 164px;
          height: 40px;
        }

        .selected-bg {
          position: absolute;
          top: 2px;
          bottom: 2px;
          left: 2px;
          width: calc(160px / 2);
          background: pink;
          transform: translateX(${selectedTab === "video" ? 0 : "100%"});
          transition: transform 0.15s;
          z-index: 2;
          background: ${colors.primaryBtnBg};
          border-radius: 5px;
        }

        .selected-btn,
        .tab-btn {
          z-index: 3;
          background: transparent;
          cursor: pointer;
          outline: none;
          width: calc(160px / 2);
          text-transform: uppercase;
          font-size: 12px;
          font-weight: 500;
          border-radius: 5px;
          border: none;
        }

        .tab-btn {
          color: ${colors.TEXT};
        }

        .selected-btn {
          color: white;
        }

        .tab-btn:hover {
          text-decoration: underline;
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
