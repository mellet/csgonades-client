import Image from "next/image";
import { FC } from "react";
import { CrossHair } from "../../nade-ui/CrossHair";

type Props = {
  lineupThumbUrl?: string;
  thumbUrl?: string;
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
          height: 100%;
          position: relative;
        }

        .result-image {
          align-items: center;
          display: flex;
          height: 100%;
          justify-content: center;
          transform: translateX(${hasLineUpImage ? "-17%" : 0});
          width: 100%;
        }

        .lineup-border {
          background: white;
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
};
