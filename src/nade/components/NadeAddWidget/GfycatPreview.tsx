import { FC } from "react";
import { useTheme } from "../../../core/settings/SettingsHooks";
import { GfycatData } from "../../models/GfycatData";
import { GfycatIframe } from "../VideoContainer/GfycatIframe";
import { FaInfoCircle } from "react-icons/fa";

type Props = {
  gfycat?: GfycatData;
};

export const GfycatPreview: FC<Props> = ({ gfycat }) => {
  const { colors } = useTheme();
  return (
    <>
      <div>
        {gfycat && <GfycatIframe gfyId={gfycat.gfyId} />}
        {!gfycat && (
          <div className="no-video-container">
            <div className="no-video-content">
              <div className="no-video-message">
                <FaInfoCircle size={40} />
                <p>Add gfycat link to preview video</p>
              </div>
            </div>
          </div>
        )}
      </div>
      <style jsx>{`
        .no-video-container {
          position: relative;
          padding-top: calc(9 / 16 * 100%);
          background: ${colors.DP01};
        }

        .no-video-content {
          position: absolute;
          top: 0;
          left: 0;
          bottom: 0;
          right: 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .no-video-message {
          display: flex;
          flex-direction: column;
          align-items: center;
          color: ${colors.GREY};
          opacity: 0.8;
        }

        .no-video-content p {
          font-size: 16px;
          margin-top: 20px;
        }
      `}</style>
    </>
  );
};
