import { FC, useState } from "react";
import { NadeItemFavBtn } from "./NadeItemFavBtn";
import { MiniGfycatIframe } from "./MiniGfycatIframe";
import Image from "next/image";

type Props = {
  disableAction?: boolean;
  nadeId: string;
  nadeSlug?: string;
  thumbnailUrl?: string;
  smallVideoUrl?: string;
  avgColor?: string;
  gfyId: string;
  upVoteCount?: number;
  downVoteCount?: number;
};

export const GfycatThumbnail: FC<Props> = ({
  thumbnailUrl,
  smallVideoUrl,
  nadeId,
  nadeSlug,
  disableAction,
  avgColor,
  gfyId,
}) => {
  const [hovering, setHovering] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);

  function onMouseEnter() {
    setHovering(true);
  }

  function onMouseLeave() {
    setHovering(false);
    setVideoLoaded(false);
  }

  function onVideoLoaded() {
    setVideoLoaded(true);
  }

  const displayBack = hovering && !!smallVideoUrl;
  const displayFavBtn = videoLoaded && hovering && !!smallVideoUrl;

  return (
    <>
      <div
        className="player"
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <div className="front">
          {thumbnailUrl && (
            <div className="thumb-img">
              <Image
                src={thumbnailUrl}
                width={400}
                height={400 * (9 / 16)}
                alt="nade thumbnail"
              />
            </div>
          )}
        </div>

        <div className={displayBack ? "back visible" : "back"}>
          {displayBack && (
            <MiniGfycatIframe gfyId={gfyId} onVideoReady={onVideoLoaded} />
          )}
          <div
            className={
              displayFavBtn ? "back-controls visible" : "back-controls"
            }
          >
            <NadeItemFavBtn
              nadeId={nadeId}
              slug={nadeSlug}
              disableAction={disableAction}
            />
          </div>
        </div>
      </div>
      <style jsx global>{`
        .thumb-img {
          filter: saturate(115%) brightness(105%);
        }
      `}</style>
      <style jsx>{`
        .player {
          position: relative;
          width: 100%;
          overflow: hidden;
          display: block;
          padding-top: 56%;
          background: ${avgColor || "black"};
        }

        .back-controls {
          position: absolute;
          top: 10px;
          right: 10px;
          display: none;
          opacity: 0;
        }

        .vote-controls {
          margin-bottom: 10px;
        }

        .front {
          position: absolute;
          top: 0;
          left: 0;
          bottom: 0;
          right: 0;
        }

        .video-icon-wrapper {
          position: absolute;
          top: 0;
          right: 0;
          color: #fff;
          background: rgba(255, 255, 255, 0.5);
          opacity: 1;
          padding: 2px 4px;
          border-radius: 3px;
          margin: 5px;
          z-index: 800;
          transition: opacity 0.15s;
        }

        .video-icon-wrapper.hidden {
          opacity: 0;
        }

        .video-icon {
          color: rgba(0, 0, 0, 0.5);
          font-size: 0.7em;
        }

        .back {
          position: absolute;
          top: 0;
          left: 0;
          bottom: 0;
          right: 0;
          opacity: 0;
          display: none;
        }

        .visible {
          display: block;
          animation-name: revealVideo;
          animation-duration: 0.3s;
          animation-fill-mode: forwards;
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
