import { FC, memo, useState } from "react";
import { GfycatIframe } from "./GfycatIframe";
import { NadeTabSelector } from "./NadeTabSelector";
import { NadeLineUpImage } from "./NadeLineupImage";
import { NadeMeta } from "../NadeMeta/NadeMeta";
import { Nade } from "../../models/Nade";
import { getNadeLineUpImage } from "../NadeItem/Utils/NadeUtils";
import { useIsDeviceSize } from "../../../core/layout/useDeviceSize";

type Props = {
  nade: Nade;
};

type Tabs = "video" | "lineup";

export const NadeVideoContainer: FC<Props> = memo(({ nade }) => {
  const [currentTab, setCurrentTab] = useState<Tabs>("video");
  const lineUpUrl = getNadeLineUpImage(nade);
  const hasLineUp = Boolean(lineUpUrl);
  const { isMobile } = useIsDeviceSize();

  return (
    <>
      {isMobile && (
        <NadeMeta
          movement={nade.movement}
          technique={nade.technique}
          tickrate={nade.tickrate}
          type={nade.type}
          teamSide={nade.teamSide}
          isPro={Boolean(nade.proUrl)}
        />
      )}

      <div className="video-wrap">
        {!isMobile && (
          <div className="nade-meta">
            <NadeMeta
              movement={nade.movement}
              technique={nade.technique}
              tickrate={nade.tickrate}
              type={nade.type}
              teamSide={nade.teamSide}
              isPro={Boolean(nade.proUrl)}
            />
          </div>
        )}

        {hasLineUp && (
          <div className="tab-selector">
            <NadeTabSelector
              selectedTab={currentTab}
              onChangeTab={setCurrentTab}
            />
          </div>
        )}

        <div className="media-container">
          {currentTab === "video" && (
            <div className="video-tab">
              <GfycatIframe gfyId={nade.gfycat.gfyId} />
            </div>
          )}

          {lineUpUrl && currentTab === "lineup" && (
            <NadeLineUpImage url={lineUpUrl} />
          )}
        </div>
      </div>
      <style jsx>{`
        .video-wrap {
          position: relative;
          overflow: hidden;
          padding-bottom: calc(56.25% + 44px);
        }

        .video-tab {
          z-index: 1;
        }

        .nade-meta {
          position: absolute;
          top: 10px;
          right: 0;
          z-index: 1;
        }

        .tab-selector {
          position: absolute;
          top: 10px;
          left: 10px;
        }

        .media-container {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
        }
      `}</style>
    </>
  );
});
