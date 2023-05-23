import { FC } from "react";

type Props = {
  youTubeId: string;
};

export const MiniYouTubePlayer: FC<Props> = ({ youTubeId }) => {
  return (
    <>
      <div className="wrap">
        <iframe
          src={`https://www.youtube.com/embed/${youTubeId}?autoplay=1&mute=1&loop=1&playsinline=1&controls=0&disablekb=1&modestbranding=1`}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
      </div>
      <style jsx>{`
        .wrap {
          width: 100%;
          position: relative;
          padding-bottom: 56.25%;
        }

        iframe {
          border: none;
          position: absolute;
          top: 0;
          left: 0;
          bottom: 0;
          right: 0;
          width: 100%;
          height: 100%;
        }
      `}</style>
    </>
  );
};
