import Image from "next/image";
import { FC } from "react";
import { CrossHair } from "../../nade-ui/CrossHair";

type Props = {
  thumbUrl?: string;
  lineupThumbUrl?: string;
};

export const ThumbImage: FC<Props> = ({ lineupThumbUrl, thumbUrl }) => {
  const hasLineUpImage = !!lineupThumbUrl;

  return (
    <>
      <div className="thumb-image">
        <div className="result-image">
          {thumbUrl && (
            <Image src={thumbUrl} layout="fill" objectFit="cover"></Image>
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
                ></Image>
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
          position: relative;
          height: 100%;
        }

        .result-image {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          transform: translateX(${hasLineUpImage ? "-17%" : 0});
        }

        .lineup-border {
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          clip-path: polygon(10% 0%, 100% 0%, 100% 100%, 0% 100%);
          width: 40.5%;
          background: white;
        }

        .lineup-image {
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          clip-path: polygon(10% 0%, 100% 0%, 100% 100%, 0% 100%);
          width: 40%;
        }

        .crosshair {
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      `}</style>
    </>
  );
};
