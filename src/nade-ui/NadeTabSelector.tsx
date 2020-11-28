import { FC } from "react";
import { Dimensions } from "../constants/Constants";
import { useTheme } from "../store/SettingsStore/SettingsHooks";

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
          top: 15px;
          right: 15px;
          z-index: 100;
          display: flex;
          border-radius: 10px;
          background: ${colors.filterBgHover};
          transition: all 0.2s;
        }

        .tab-btn {
          background: ${colors.filterBgHover};
          border: 1px solid ${colors.filterBgHover};
          cursor: pointer;
          outline: none;
          padding: 15px 20px;
          color: rgba(255, 255, 255, 0.5);
          text-transform: uppercase;
          font-size: 12px;
          font-weight: 500;
          border-radius: 10px;
        }

        .tab-btn:hover {
          color: rgba(255, 255, 255, 1);
        }

        .selected {
          border: 1px solid rgba(255, 255, 255, 0.8);
          color: rgba(255, 255, 255, 1);
          background: ${colors.filterBg};
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
