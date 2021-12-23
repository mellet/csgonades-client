import { FC } from "react";
import { Dimensions } from "../../../constants/Constants";
import { useGa } from "../../../utils/Analytics";

type Props = {
  onChangeTab: (newTab: "video" | "lineup") => void;
  selectedTab: "video" | "lineup";
};

export const NadeTabSelector: FC<Props> = ({ selectedTab, onChangeTab }) => {
  const ga = useGa();
  const isVideoSelected = selectedTab === "video";
  const isLineUpSelected = selectedTab === "lineup";

  function onChangeToVideo() {
    onChangeTab("video");
    ga.event({ category: "nade_page", action: "click_video_tab" });
  }

  function onChangeToLineup() {
    onChangeTab("lineup");
    ga.event({ category: "nade_page", action: "click_linup_tab" });
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
        .selected-bg {
          position: absolute;
          padding: 0px;
          top: 0px;
          bottom: 0px;
          left: 0px;
          width: 50%;
          transform: translateX(${selectedTab === "video" ? 0 : "100%"});
          transition: transform 0.15s;
          z-index: 2;
        }

        .selected-bg-fill {
          background: rgba(255, 255, 255, 0.85);
          width: 100%;
          height: 100%;
          z-index: 3;
        }

        .tab-selector {
          position: absolute;
          top: ${Dimensions.GUTTER_SIZE}px;
          right: ${Dimensions.GUTTER_SIZE}px;
          z-index: 1;
          display: flex;
          border-radius: ${Dimensions.BORDER_RADIUS};
          background: transparent;
          transition: all 0.2s;
          overflow: hidden;
          width: 120px;
          height: 40px;
          border: 1px solid rgba(255, 255, 255, 0.9);
        }

        .tab-btn {
          z-index: 3;
          background: transparent;
          cursor: pointer;
          outline: none;
          text-transform: uppercase;
          font-size: 12px;
          font-weight: 500;
          border: none;
          flex: 1;
          color: rgba(255, 255, 255, 0.9);
          transition: all 0.2s;
        }

        .tab-btn:hover {
          background: rgba(255, 255, 255, 0.3);
        }

        .selected {
          color: #222;
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
