import { FC, memo, useState } from "react";
import { GfycatIframe } from "./GfycatIframe";
import { NadeTabSelector } from "./NadeTabSelector";
import { NadeLineUpImage } from "./NadeLineupImage";
import { NadeMeta } from "../NadeMeta/NadeMeta";
import { Nade } from "../../models/Nade";
import { useIsDeviceSize } from "../../../core/layout/useDeviceSize";
import { CsGoYouTubePlayer } from "./YouTubePlayer";
import { NadeStats } from "./NadeStats";

type Props = {
  nade: Nade;
};

type Tabs = "video" | "lineup";

export const NadeVideoContainer: FC<Props> = memo(({ nade }) => {
  const [currentTab, setCurrentTab] = useState<Tabs>("video");
  const hasLineUp = Boolean(nade.images.lineup.large);
  const { isMobile } = useIsDeviceSize();

  return (
    <>
      <div className="top-container">
        <NadeMeta
          movement={nade.movement}
          technique={nade.technique}
          tickrate={nade.gameMode === "csgo" ? nade.tickrate : undefined}
          type={nade.type}
          teamSide={nade.teamSide}
          proUrl={nade.proUrl}
        />

        {hasLineUp && (
          <div className="tab-selector">
            <NadeTabSelector
              selectedTab={currentTab}
              onChangeTab={setCurrentTab}
            />
          </div>
        )}
      </div>

      <div className="video-wrap">
        <div className="media-container">
          {currentTab === "video" && (
            <div className="video-tab">
              {nade.youTubeId && (
                <CsGoYouTubePlayer youTubeId={nade.youTubeId} />
              )}
              {nade.gfycat && <GfycatIframe gfyId={nade.gfycat.gfyId} />}
            </div>
          )}

          {hasLineUp && currentTab === "lineup" && (
            <NadeLineUpImage url={nade.images.lineup.large} />
          )}
        </div>
      </div>

      <NadeStats commentCount={nade.commentCount} viewCount={nade.viewCount} />

      <style jsx>{`
        .top-container {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          flex-direction: ${isMobile ? "column" : "row"};
        }

        .video-wrap {
          position: relative;
          overflow: hidden;
          padding-bottom: calc(56.25%);
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
