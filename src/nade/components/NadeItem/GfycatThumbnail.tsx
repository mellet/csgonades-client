import { FC, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { ThumbImage } from "./ThumbImage";
import { useTheme } from "../../../core/settings/SettingsHooks";

const MiniGfycatIframe = dynamic(() => import("./MiniGfycatIframe"));

type Props = {
  avgColor?: string;
  disableAction?: boolean;
  downVoteCount?: number;
  gfyId: string;
  lineUpThumnUrl?: string;
  nadeId: string;
  nadeSlug?: string;
  smallVideoUrl?: string;
  thumbnailUrl?: string;
  upVoteCount?: number;
};

export const GfycatThumbnail: FC<Props> = ({
  gfyId,
  lineUpThumnUrl,
  smallVideoUrl,
  thumbnailUrl,
}) => {
  const { colors } = useTheme();
  const [isReadyForHover, setIsReadyForHover] = useState(false);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsReadyForHover(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  function onMouseEnter() {
    if (isReadyForHover) {
      setHovering(true);
    }
  }

  function onMouseLeave() {
    setHovering(false);
  }

  const displayBack = hovering && !!smallVideoUrl;

  return (
    <>
      <div
        className="player"
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <div className="front">
          <ThumbImage thumbUrl={thumbnailUrl} lineupThumbUrl={lineUpThumnUrl} />
        </div>

        <div className={displayBack ? "back visible" : "back"}>
          {displayBack && <MiniGfycatIframe gfyId={gfyId} />}
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
