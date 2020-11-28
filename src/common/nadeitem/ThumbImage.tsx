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
        <div className="result-image"></div>
        {hasLineUpImage && (
          <>
            <div className="lineup-border"></div>
            <div className="lineup-image">
              <CrossHair size={20} />
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
          background: blue;
          width: ${hasLineUpImage ? "70%" : "100%"};
          height: 100%;
          background: url(${thumbUrl});
          background-position: center;
          background-size: cover;
        }

        .lineup-border {
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          clip-path: polygon(10% 0%, 100% 0%, 100% 100%, 0% 100%);
          width: 41%;
          background: white;
        }

        .lineup-image {
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          clip-path: polygon(10% 0%, 100% 0%, 100% 100%, 0% 100%);
          background: pink;
          width: 40%;
          background: url(${lineupThumbUrl});
          background-position: center;
          background-size: cover;
        }

        .lineup-image {
          display: flex;
          align-items: center;
          justify-content: center;
        }
      `}</style>
    </>
  );
};
