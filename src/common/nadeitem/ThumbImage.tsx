import Image from "next/image";
import { FC, memo } from "react";
import { CrossHair } from "../../nade-ui/CrossHair";
import { useTheme } from "../../store/SettingsStore/SettingsHooks";

type Props = {
  lineupThumbUrl?: string;
  thumbUrl?: string;
};

export const ThumbImage: FC<Props> = memo(({ lineupThumbUrl, thumbUrl }) => {
  const hasLineUpImage = !!lineupThumbUrl;
  const { colors } = useTheme();

  return (
    <>
      <div className={"thumb-image"}>
        <div className="result-image">
          {thumbUrl && (
            <Image
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
        .thumb-image {
          opacity: 1;
          height: 100%;
          position: relative;
          filter: brightness(1.1) saturate(120%) contrast(105%);
          transition: opacity 0.5s;
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
