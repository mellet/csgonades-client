import { FC, memo, useState } from "react";
import { GfycatIframe } from "./components/GfycatIframe";
import { CrossHair } from "./CrossHair";
import { useTheme } from "../store/SettingsStore/SettingsHooks";
import { Dimensions } from "../constants/Constants";

type Props = {
  lineUpUrl?: string;
  gfyId: string;
};

type Tabs = "video" | "lineup";

const CROSSHAIR_SIZE = 7;

export const NadeVideoContainer: FC<Props> = memo(({ gfyId, lineUpUrl }) => {
  const { colors } = useTheme();
  const [currentTab, setCurrentTab] = useState<Tabs>("video");

  function onSetVideoTab() {
    setCurrentTab("video");
  }

  function onSetLineUpTab() {
    setCurrentTab("lineup");
  }

  const hasLineUp = !!lineUpUrl;

  return (
    <>
      <div className="video-wrap">
        {hasLineUp && (
          <div className="tab-selector">
            <button
              className={
                currentTab === "video" ? "tab-btn selected" : "tab-btn"
              }
              onClick={onSetVideoTab}
            >
              Video
            </button>
            <button
              className={
                currentTab === "lineup" ? "tab-btn selected" : "tab-btn"
              }
              onClick={onSetLineUpTab}
            >
              Line Up
            </button>
          </div>
        )}

        <div className="video-tab">
          <GfycatIframe gfyId={gfyId} />
        </div>
        {hasLineUp && currentTab === "lineup" && (
          <div className={"lineup-tab"}>
            <div className="line-up-img">
              {false && (
                <>
                  <div className="vertical-line"></div>
                  <div className="vertical-line2"></div>
                  <div className="horizontal-line"></div>
                  <div className="horizontal-line2"></div>
                </>
              )}

              <div className="crosshair">
                <CrossHair />
              </div>
            </div>
          </div>
        )}
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

        .video-wrap {
          position: relative;
          overflow: hidden;
        }

        .lineup-tab {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          overflow: hidden;
          padding-bottom: calc(56.25%);
          background: #121212 url("/loading.gif");
          background-position: center;
          background-repeat: no-repeat;
          background-size: 20px;
        }

        .line-up-img {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: url(${lineUpUrl});
          background-size: contain;
          background-position: center;
          transform: scale(1);
          transition: all 0.2s;
          filter: brightness(120%);
        }

        .lineup-tab:hover .line-up-img {
          transform: scale(3);
        }

        .close {
          position: absolute;
          top: 20px;
          right: 20px;
          color: rgba(255, 255, 255, 0.8);
          font-size: 30px;
        }

        .msg {
          display: block;
          outline: none;
          padding: 40px;
          position: absolute;
          bottom: 0px;
          right: 0px;
          left: 0px;
          z-index: 800;
          color: white;
          font-size: 40px;
          font-weight: 500;
          background: rgba(0, 0, 0, 0.8);
          color: white;
          pointer-events: none;
          text-align: center;
        }

        .crosshair {
          position: absolute;
          top: 0px;
          right: 0px;
          bottom: 0px;
          left: 0px;
          opacity: 0.55;
          display: flex;
          justify-content: center;
          align-items: center;
          transform: scale(0.4);
        }

        .vertical-line,
        .vertical-line2 {
          position: absolute;
          height: 2px;
          width: ${CROSSHAIR_SIZE}px;
          background: rgba(255, 255, 255, 0.8);
          top: calc(50% - 1px);
          left: calc(50% - ${CROSSHAIR_SIZE + 4}px);
          outline: 1px solid rgba(0, 0, 0, 0.8);
        }

        .vertical-line2 {
          right: calc(50% - ${CROSSHAIR_SIZE + 4}px);
          left: auto;
        }

        .horizontal-line {
          position: absolute;
          width: 2px;
          height: ${CROSSHAIR_SIZE}px;
          background: rgba(255, 255, 255, 0.8);
          top: calc(50% - ${CROSSHAIR_SIZE + 4}px);
          left: calc(50% - 1px);
          outline: 1px solid rgba(0, 0, 0, 0.8);
        }

        .horizontal-line2 {
          position: absolute;
          width: 2px;
          height: ${CROSSHAIR_SIZE}px;
          background: rgba(255, 255, 255, 0.8);
          bottom: calc(50% - ${CROSSHAIR_SIZE + 4}px);
          left: calc(50% - 1px);
          outline: 1px solid rgba(0, 0, 0, 0.8);
        }

        @media only screen and (max-width: ${Dimensions.MOBILE_THRESHHOLD}) {
          .tab-btn {
            padding: 10px 10px;
          }
        }
      `}</style>
    </>
  );
});
