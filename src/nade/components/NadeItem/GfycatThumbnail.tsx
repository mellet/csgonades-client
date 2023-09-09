import { FC, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { ThumbImage } from "./Views/ThumbImage";
import { useTheme } from "../../../core/settings/useTheme";
import { useGa } from "../../../utils/Analytics";
import { useIsDeviceSize } from "../../../core/layout/useDeviceSize";
import { GameMode } from "../../models/GameMode";

const MiniYouTubePlayer = dynamic(
  () => import("./Views/MiniYouTubePlayer").then((m) => m.MiniYouTubePlayer),
  { ssr: false }
);

type Props = {
  avgColor?: string;
  disableAction?: boolean;
  gameMode: GameMode;
  gfyId?: string;
  lineUpThumnUrl?: string;
  nadeId: string;
  nadeSlug?: string;
  thumbnailUrl?: string;
  youTubeId?: string;
  speed?: "normal" | "fast";
  quality?: "hd" | "sd";
};

export const GfycatThumbnail: FC<Props> = ({
  nadeId,
  lineUpThumnUrl,
  thumbnailUrl,
  nadeSlug,
  youTubeId,
  speed = "fast",
  gameMode,
}) => {
  const ga = useGa();
  const { colors } = useTheme();
  const [isReadyForHover, setIsReadyForHover] = useState(false);
  const [hovering, setHovering] = useState(false);
  const { isMobile } = useIsDeviceSize();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsReadyForHover(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  // GA Event if video plays more than 2 second
  useEffect(() => {
    const timer = setTimeout(() => {
      if (hovering) {
        ga.event({
          category: "nade_item",
          action: "play_small_video",
          label: nadeSlug || nadeId,
        });
      }
    }, 2000);
    return () => clearTimeout(timer);
  }, [ga, hovering, nadeId, nadeSlug]);

  function onMouseEnter() {
    if (isMobile) {
      return;
    }
    if (isReadyForHover) {
      setHovering(true);
    }
  }

  function onMouseLeave() {
    setHovering(false);
  }

  return (
    <>
      <div
        className="player"
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <div className="front">
          <ThumbImage
            thumbUrl={thumbnailUrl}
            lineupThumbUrl={lineUpThumnUrl}
            gameMode={gameMode}
          />
        </div>

        <div className={hovering ? "back visible" : "back"}>
          {hovering && youTubeId && (
            <>
              <MiniYouTubePlayer youTubeId={youTubeId} speed={speed} />
            </>
          )}
        </div>
      </div>
      <style jsx global>{`
        .thumb-img {
          filter: saturate(115%) brightness(105%);
        }
      `}</style>
      <style jsx>{`
        .player {
          background: ${colors.DP01};
          display: block;
          overflow: hidden;
          padding-top: 56%;
          position: relative;
          width: 100%;
        }

        .back-controls {
          display: none;
          opacity: 0;
          position: absolute;
          right: 6px;
          bottom: 6px;
        }

        .vote-controls {
          margin-bottom: 10px;
        }

        .front {
          bottom: 0;
          left: 0;
          position: absolute;
          right: 0;
          top: 0;
          pointer-events: none;
        }

        .video-icon-wrapper {
          background: rgba(255, 255, 255, 0.5);
          border-radius: 3px;
          color: #fff;
          margin: 5px;
          opacity: 1;
          padding: 2px 4px;
          position: absolute;
          right: 0;
          top: 0;
          transition: opacity 0.15s;
          z-index: 800;
        }

        .video-icon-wrapper.hidden {
          opacity: 0;
        }

        .video-icon {
          color: rgba(0, 0, 0, 0.5);
          font-size: 0.7em;
        }

        .back {
          bottom: 0;
          display: none;
          left: 0;
          opacity: 0;
          position: absolute;
          right: 0;
          top: 0;
          pointer-events: none;
        }

        .visible {
          animation-duration: 0.3s;
          animation-fill-mode: forwards;
          animation-name: revealVideo;
          display: block;
          opacity: 1;
        }

        @keyframes revealVideo {
          0% {
            opacity: 0;
          }
          90% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }
      `}</style>
    </>
  );
};
