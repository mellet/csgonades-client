import { FC, MouseEventHandler } from "react";
import { FaCrosshairs, FaVideo } from "react-icons/fa";
import { Dimensions, LayoutBreakpoint } from "../../../constants/Constants";
import { useTheme } from "../../../core/settings/SettingsHooks";
import { useGa } from "../../../utils/Analytics";

type Props = {
  onChangeTab: (newTab: "video" | "lineup") => void;
  selectedTab: "video" | "lineup";
};

export const NadeTabSelector: FC<Props> = ({ selectedTab, onChangeTab }) => {
  const { colors } = useTheme();
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
        <button
          className={isVideoSelected ? "tab-btn selected" : "tab-btn"}
          onClick={onChangeToVideo}
        >
          <FaVideo style={{ marginRight: 4 }} />
          Video
        </button>
        <button
          className={isLineUpSelected ? "tab-btn selected" : "tab-btn"}
          onClick={onChangeToLineup}
        >
          <FaCrosshairs style={{ marginRight: 4 }} />
          Line Up
        </button>
      </div>
      <style jsx>{`
        .tab-selector {
          position: relative;
          display: flex;
          border-radius: ${Dimensions.BORDER_RADIUS};
          transition: all 0.2s;
          overflow: hidden;
          height: 40px;
          z-index: 1;
        }

        .tab-btn {
          background: ${colors.DP01};
          color: ${colors.TEXT};
          cursor: pointer;
          outline: none;
          text-transform: uppercase;
          font-size: 12px;
          line-height: 12px;
          font-weight: 500;
          border: none;
          flex: 1;
          transition: all 0.2s;
          white-space: nowrap;
          padding: 0;
          border-right: 1px solid ${colors.BORDER};
          display: flex;
          align-items: center;
          padding: 4px 8px;
        }

        .tab-btn:last-child {
          border-right: none;
        }

        .tab-btn:hover {
          background: ${colors.DP03};
        }

        .selected {
          background: ${colors.DP03};
          color: ${colors.filterBgHover};
        }

        .selected:hover {
          text-decoration: none;
        }

        @media only screen and (max-width: ${LayoutBreakpoint.MOBILE}px) {
          .tab-selector {
            height: 30px;
          }

          .tab-btn {
            font-size: 10px;
          }
        }
      `}</style>
    </>
  );
};
