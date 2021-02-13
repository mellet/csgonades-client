import Image from "next/image";
import { FC, memo, useEffect, useState } from "react";
import { CrossHair } from "../VideoContainer/CrossHair";
import { useTheme } from "../../../core/settings/SettingsHooks";
import { FaVideo } from "react-icons/fa";
import { CSGNIcon } from "../NadeStatus/CSGNIcon";

type Props = {
  lineupThumbUrl?: string;
  thumbUrl?: string;
};

export const ThumbImage: FC<Props> = memo(({ lineupThumbUrl, thumbUrl }) => {
  const hasLineUpImage = !!lineupThumbUrl;
  const [resultImgRdy, setResultImgRdy] = useState(false);
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
    const timer = setTimeout(() => {
      if (hasLineUpImage) {
        if (resultImgRdy && lineupImgRdy) {
          setVisisble(true);
        }
      } else {
        if (resultImgRdy) {
          setVisisble(true);
        }
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [resultImgRdy, lineupImgRdy, hasLineUpImage]);

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
          <CSGNIcon size={12} icon={<FaVideo />} />
        </div>
        <div className="result-image">
          {thumbUrl && (
            <Image
              onLoad={onResultImgRdy}
              src={thumbUrl}
              layout="fill"
              objectFit="cover"
              quality={100}
            ></Image>
          )}
        </div>
        {lineupThumbUrl && (
          <>
            <div className="lineup-border"></div>
            <div className="lineup-image">
              <div className="lineup-img-wrap">
                <Image
                  onLoad={onLineupImgRdy}
                  src={lineupThumbUrl}
                  layout="fill"
                  objectFit="cover"
                  quality={100}
                />
              </div>
              <div className="crosshair">
                <CrossHair size={20} />
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
          background: rgba(255, 255, 255, 0.8);
          padding: 2px 4px;
          border-radius: 4px;
          opacity: 0.8;
        }

        .thumb-image {
          opacity: 0;
          height: 100%;
          position: relative;
          filter: brightness(1.1) saturate(120%) contrast(105%);
          transition: opacity 0.2s;
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
