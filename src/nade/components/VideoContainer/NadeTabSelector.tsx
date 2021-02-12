import { FC } from "react";
import { Dimensions } from "../../../constants/Constants";
import { useTheme } from "../../../core/settings/SettingsHooks";
import { useGaEvent } from "../../../utils/Analytics";

type Props = {
  onChangeTab: (newTab: "video" | "lineup") => void;
  selectedTab: "video" | "lineup";
};

export const NadeTabSelector: FC<Props> = ({ selectedTab, onChangeTab }) => {
  const event = useGaEvent();
  const { colors } = useTheme();

  const isVideoSelected = selectedTab === "video";
  const isLineUpSelected = selectedTab === "lineup";

  function onChangeToVideo() {
    onChangeTab("video");
    event({ category: "Nade Page", action: "Select Video Tab" });
  }

  function onChangeToLineup() {
    onChangeTab("lineup");
    event({ category: "Nade Page", action: "Select Line Up Tab" });
  }

  return (
    <>
      <div className="tab-selector">
        <div className="selected-bg">
          <div className="selected-bg-fill" />
        </div>
        <button
          className={isVideoSelected ? "tab-btn selected" : "tab-btn"}
          onClick={onChangeToVideo}
        >
          Video
        </button>
        <button
          className={isLineUpSelected ? "tab-btn selected" : "tab-btn"}
          onClick={onChangeToLineup}
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
          border-radius: 8px;
          background: ${colors.DP03};
          transition: all 0.2s;
          overflow: hidden;
          width: 140px;
          height: 40px;
          padding: 2px;
        }

        .selected-bg {
          position: absolute;
          padding: 1px;
          top: 0px;
          bottom: 0px;
          left: 0px;
          width: 50%;
          transform: translateX(${selectedTab === "video" ? 0 : "100%"});
          transition: transform 0.15s;
          z-index: 2;
          border-radius: 8px;
        }

        .tab-btn {
          color: ${colors.TEXT};
          z-index: 3;
          background: transparent;
          cursor: pointer;
          outline: none;
          text-transform: uppercase;
          font-size: 12px;
          font-weight: 500;
          border-radius: 8px;
          border: none;
          flex: 1;
        }

        .selected-bg-fill {
          background: #111;
          width: 100%;
          height: 100%;
          z-index: 3;
          border-radius: 8px;
          color: white;
        }

        .selected-btn {
          color: white;
        }

        .tab-btn:hover {
          text-decoration: underline;
        }

        .selected {
          color: white;
        }

        .selected:hover {
          text-decoration: none;
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
