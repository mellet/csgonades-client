import { FC, memo, useState } from "react";
import { NadeTabSelector } from "./NadeTabSelector";
import { NadeLineUpImage } from "./NadeLineupImage";
import { NadeMeta } from "../NadeMeta/NadeMeta";
import { useIsDeviceSize } from "../../../core/layout/useDeviceSize";
import { CsGoYouTubePlayer } from "./YouTubePlayer";
import { NadeStats } from "./NadeStats";
import { NadeImages } from "../../models/NadeImages";
import { Tickrate } from "../../models/NadeTickrate";
import { GameMode } from "../../models/GameMode";
import { NadeMovement } from "../../models/NadeMovement";
import { Technique } from "../../models/Technique";
import { NadeType } from "../../models/NadeType";
import { TeamSide } from "../../models/TeamSide";

type Props = {
  images: NadeImages;
  commentCount: number;
  tickRate: Tickrate;
  gameMode: GameMode;
  viewCount: number;
  youTubeId: string;
  movement: NadeMovement;
  technique: Technique;
  type: NadeType;
  teamSide: TeamSide;
  proUrl?: string;
};

type Tabs = "video" | "lineup";

export const NadeVideoContainer: FC<Props> = memo(
  ({
    images,
    commentCount,
    gameMode,
    tickRate,
    viewCount,
    youTubeId,
    movement,
    technique,
    type,
    teamSide,
    proUrl,
  }) => {
    const [currentTab, setCurrentTab] = useState<Tabs>("video");
    const hasLineUp = Boolean(images.lineup.large);
    const { isMobile } = useIsDeviceSize();

    return (
      <>
        <div className="top-container">
          <NadeMeta
            movement={movement}
            technique={technique}
            tickrate={gameMode === "csgo" ? tickRate : undefined}
            type={type}
            teamSide={teamSide}
            proUrl={proUrl}
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
                {youTubeId && <CsGoYouTubePlayer youTubeId={youTubeId} />}
              </div>
            )}

            {hasLineUp && currentTab === "lineup" && (
              <NadeLineUpImage url={images.lineup.large} />
            )}
          </div>
        </div>

        <NadeStats commentCount={commentCount} viewCount={viewCount} />

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
  }
);
