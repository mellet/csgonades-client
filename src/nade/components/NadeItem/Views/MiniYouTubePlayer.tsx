import { FC, useState } from "react";
import YouTube, { YouTubeEvent, YouTubePlayer } from "react-youtube";

type Props = {
  youTubeId: string;
  speed?: "normal" | "fast";
  quality?: "hd" | "sd";
};

export const MiniYouTubePlayer: FC<Props> = ({
  youTubeId,
  speed = "fast",
  quality = "sd",
}) => {
  const [player, setPlayer] = useState<YouTubePlayer>();

  async function onReady(event: YouTubeEvent<any>) {
    setPlayer(event.target);
    event.target.mute();
    event.target.setPlaybackRate(speed === "fast" ? 2.0 : 1.5);
    event.target.setPlaybackQuality(quality);
    event.target.playVideo();
  }

  function onEnd() {
    if (!player) return;
    player.playVideo();
  }

  return (
    <>
      <div className="wrap">
        <YouTube
          videoId={youTubeId}
          opts={{
            playerVars: {
              loop: 1,
              controls: 0,
              modestbranding: 1,
              rel: 0,
            },
          }}
          className="youtubeContainer"
          onReady={onReady}
          onEnd={onEnd}
        />
      </div>
      <style jsx global>{`
        .youtubeContainer {
          position: relative;
          width: 100%;
          height: 0;
          padding-bottom: 56.25%;
          overflow: hidden;
        }

        .youtubeContainer iframe {
          width: 100%;
          height: 100%;
          position: absolute;
          top: 0;
          left: 0;
          border: none;
        }
      `}</style>
    </>
  );
};
