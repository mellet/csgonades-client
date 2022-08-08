import { FC, MouseEventHandler } from "react";
import { Dimensions, LayoutBreakpoint } from "../../../constants/Constants";
import { useGa } from "../../../utils/Analytics";

type Props = {
  onChangeTab: (newTab: "video" | "lineup") => void;
  selectedTab: "video" | "lineup";
};

export const NadeTabSelector: FC<Props> = ({ selectedTab, onChangeTab }) => {
  const ga = useGa();
  const isVideoSelected = selectedTab === "video";
  const isLineUpSelected = selectedTab === "lineup";

  const onChangeToVideo: MouseEventHandler<HTMLButtonElement> = (e) => {
    onChangeTab("video");
    ga.event({ category: "nade_page", action: "click_video_tab" });
    e.stopPropagation();
  };

  const onChangeToLineup: MouseEventHandler<HTMLButtonElement> = (e) => {
    onChangeTab("lineup");
    ga.event({ category: "nade_page", action: "click_linup_tab" });
    e.stopPropagation();
  };

  const stopBubble: MouseEventHandler<HTMLDivElement> = (e) => {
    e.stopPropagation();
  };

  return (
    <>
      <div className="tab-selector" onClick={stopBubble}>
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
          top: ${Dimensions.GUTTER_SIZE}px;
          right: ${Dimensions.GUTTER_SIZE}px;
          z-index: 1;
          display: flex;
          border-radius: ${Dimensions.BORDER_RADIUS};
          background: rgba(255, 255, 255, 0.2);
          transition: all 0.2s;
          overflow: hidden;
          width: 120px;
          height: 40px;
          border: 1px solid rgba(255, 255, 255, 0.9);
        }

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
          pointer-events: none;
        }

        .selected-bg-fill {
          background: rgba(255, 255, 255, 0.85);
          width: 100%;
          height: 100%;
          z-index: 3;
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

        @media only screen and (max-width: ${LayoutBreakpoint.MOBILE}px) {
          .tab-selector {
            position: absolute;
            top: 0;
            left: calc(50% - 55px);
            height: 30px;
            border-top-right-radius: 0;
            border-top-left-radius: 0;
            width: 110px;
          }

          .tab-btn {
            font-size: 10px;
          }
        }
      `}</style>
    </>
  );
};
