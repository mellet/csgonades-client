import { FC } from "react";
import { GfycatData } from "../../models/GfycatData";
import { GfycatIframe } from "../VideoContainer/GfycatIframe";

type Props = {
  gfycat?: GfycatData;
};

export const GfycatPreview: FC<Props> = ({ gfycat }) => {
  return (
    <>
      <div className="gfycat-preview-container">
        {!gfycat && (
          <div className="no-video-content">
            <div className="no-video-message">
              Example of a good video with no clutter and high visiblity of
              crosshair.
            </div>
          </div>
        )}
        {<GfycatIframe gfyId={gfycat?.gfyId || "flippantenviousjay"} />}
      </div>
      <style jsx>{`
        .gfycat-preview-container {
          position: relative;
        }

        .no-video-content {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 999;
          background: rgba(0, 0, 0, 0.75);
          color: white;
          height: 34px;
          font-size: 14px;
        }
      `}</style>
    </>
  );
};
