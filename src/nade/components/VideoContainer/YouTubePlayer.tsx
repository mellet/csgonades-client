import { FC, useState } from "react";
import YouTube, { YouTubeEvent, YouTubePlayer } from "react-youtube";

type Props = {
  youTubeId: string;
};

export const CsGoYouTubePlayer: FC<Props> = ({ youTubeId }) => {
  const [loopCount, setLoopCount] = useState(1);
  const [player, setPlayer] = useState<YouTubePlayer>();

  async function onReady(event: YouTubeEvent<any>) {
    setPlayer(event.target);
    event.target.mute();
    event.target.playVideo();
  }

  function onEnd() {
    if (!player || loopCount >= 2) return;
    player.playVideo();
    setLoopCount((curCount) => curCount + 1);
  }

  return (
    <>
      <div className="wrap">
        <YouTube
          videoId={youTubeId}
          opts={{
            playerVars: {
              modestbranding: 1,
            },
          }}
          className="youtubeContainer"
          onReady={onReady}
          onEnd={onEnd}
        />
      </div>
      <style jsx global>{`
        .wrap {
          background: #000;
        }

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
