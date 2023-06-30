import Image from "next/image";
import { FC, memo, useEffect, useState } from "react";
import { CrossHairSvg } from "../../VideoContainer/CrossHairSvg";
import { useTheme } from "../../../../core/settings/useTheme";
import { FaVideo } from "react-icons/fa";
import { CSGNIcon } from "../../NadeStatus/CSGNIcon";

type Props = {
  lineupThumbUrl?: string;
  thumbUrl?: string;
};

export const ThumbImage: FC<Props> = memo(({ lineupThumbUrl, thumbUrl }) => {
  const hasLineUpImage = !!lineupThumbUrl;
  const [resultImgRdy, setResultImgRdy] = useState(!hasLineUpImage);
  const [lineupImgRdy, setLineupImgRdy] = useState(false);
  const [visible, setVisisble] = useState(false);

  // If loading images is super slow or event is not fiering
  // show image optimisticly
  useEffect(() => {
    const slowTimer = setTimeout(() => {
      setVisisble(true);
    }, 1500);
    return () => clearTimeout(slowTimer);
  }, []);

  useEffect(() => {
    const showImagesTimer = setTimeout(() => {
      if (resultImgRdy && lineupImgRdy) {
        setVisisble(true);
      }
    }, 500);
    return () => clearTimeout(showImagesTimer);
  }, [resultImgRdy, lineupImgRdy]);

  const { colors } = useTheme();

  function onResultImgRdy() {
    setResultImgRdy(true);
  }
  function onLineupImgRdy() {
    setLineupImgRdy(true);
  }

  return (
    <>
      <div className={visible ? "thumb-image visible" : "thumb-image"}>
        <div className="video-icon">
          <CSGNIcon size={12} icon={<FaVideo color="rgba(0, 0, 0, 0.4)" />} />
        </div>
        <div className="result-image">
          {thumbUrl && (
            <Image
              alt="Nade result image"
              fill
              onLoad={onResultImgRdy}
              src={thumbUrl}
              style={{
                objectFit: "cover",
              }}
            ></Image>
          )}
        </div>
        {lineupThumbUrl && (
          <>
            <div className="lineup-border"></div>
            <div className="lineup-image">
              <div className="lineup-img-wrap">
                <Image
                  fill
                  alt="Nade lineup image"
                  unoptimized
                  onLoad={onLineupImgRdy}
                  src={lineupThumbUrl}
                  quality={100}
                  style={{
                    objectFit: "cover",
                  }}
                />
              </div>
              <div className="crosshair">
                <CrossHairSvg size={20} />
              </div>
            </div>
          </>
        )}
      </div>
      <style jsx>{`
        .video-icon {
          position: absolute;
          top: 6px;
          right: 6px;
          z-index: 1;
          color: #111;
          background: rgba(255, 255, 255, 0.2);
          padding: 3px 6px;
          border-radius: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .thumb-image {
          opacity: 0;
          height: 100%;
          position: relative;
          filter: brightness(1.1) saturate(120%) contrast(105%);
          transition: opacity 0.3s;
        }

        .visible {
          opacity: 1;
        }

        .result-image {
          background: ${colors.DP01};
          align-items: center;
          display: flex;
          height: 100%;
          justify-content: center;
          transform: translateX(${hasLineUpImage ? "-17%" : 0});
          width: 100%;
        }

        .lineup-border {
          background: ${colors.DP01};
          bottom: 0;
          clip-path: polygon(10% 0%, 100% 0%, 100% 100%, 0% 100%);
          position: absolute;
          right: 0;
          top: 0;
          width: 40.5%;
        }

        .lineup-image {
          bottom: 0;
          clip-path: polygon(10% 0%, 100% 0%, 100% 100%, 0% 100%);
          position: absolute;
          right: 0;
          top: 0;
          width: 40%;
        }

        .crosshair {
          align-items: center;
          bottom: 0;
          display: flex;
          justify-content: center;
          left: 0;
          position: absolute;
          right: 0;
          top: 0;
        }
      `}</style>
    </>
  );
});
