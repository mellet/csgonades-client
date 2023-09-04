import Image from "next/image";
import { FC, memo, useEffect, useState } from "react";
import { CrossHairSvg } from "../../VideoContainer/CrossHairSvg";
import { useTheme } from "../../../../core/settings/useTheme";
import { GameMode } from "../../../models/GameMode";

type Props = {
  lineupThumbUrl?: string;
  thumbUrl?: string;
  gameMode: GameMode;
};

const LINEUP_SIZE = 100;

export const ThumbImage: FC<Props> = memo(
  ({ lineupThumbUrl, thumbUrl, gameMode }) => {
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

    const filterBrightnes = gameMode === "csgo" ? 1.1 : 1;
    const filterSaturation = gameMode === "csgo" ? 120 : 100;
    const filterContrast = gameMode === "csgo" ? 105 : 100;

    return (
      <>
        <div className={visible ? "thumb-image visible" : "thumb-image"}>
          <div className="image-container">
            {lineupThumbUrl && (
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
            )}
            <div className="crosshair">
              <CrossHairSvg size={20} />
            </div>
          </div>
          {thumbUrl && (
            <>
              <div className="lineup-image">
                <div className="lineup-img-wrap">
                  <Image
                    alt="Nade result image"
                    fill
                    onLoad={onResultImgRdy}
                    src={thumbUrl}
                    style={{
                      objectFit: "cover",
                      transform: "scale(1.6)",
                    }}
                  ></Image>
                </div>
              </div>
            </>
          )}
        </div>
        <style jsx>{`
          .thumb-image {
            opacity: 0;
            height: 100%;
            position: relative;
            filter: brightness(${filterBrightnes})
              saturate(${filterSaturation}%) contrast(${filterContrast}%);
            transition: opacity 0.3s;
          }

          .visible {
            opacity: 1;
          }

          .image-container {
            background: ${colors.DP01};
            align-items: center;
            display: flex;
            height: 100%;
            justify-content: center;
            width: 100%;
          }

          .lineup-image {
            width: ${LINEUP_SIZE}px;
            height: ${LINEUP_SIZE * (9 / 14)}px;
            border-radius: 12px;
            position: absolute;
            bottom: 12px;
            left: 12px;
            border: 2px solid white;
            overflow: hidden;
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
  }
);
