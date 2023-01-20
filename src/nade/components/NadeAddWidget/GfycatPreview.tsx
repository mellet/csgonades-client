import { FC } from "react";
import { FaVideo } from "react-icons/fa";
import { useTheme } from "../../../core/settings/SettingsHooks";
import { GfycatData } from "../../models/GfycatData";
import { GfycatIframe } from "../VideoContainer/GfycatIframe";

type Props = {
  gfycat?: GfycatData;
};

export const GfycatPreview: FC<Props> = ({ gfycat }) => {
  const { colors } = useTheme();

  return (
    <>
      <div className="gfycat-preview-container">
        {!gfycat && (
          <div className="no-video-content">
            <div className="no-video-message">
              <span className="icon">
                <FaVideo size={20} />
              </span>
              <span>Preview</span>
            </div>
          </div>
        )}
        {gfycat && <GfycatIframe gfyId={gfycat?.gfyId} />}
      </div>
      <style jsx>{`
        .gfycat-preview-container {
          min-height: 280px;
          background: ${colors.DP01};
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .no-video-content {
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 999;

          color: ${colors.GREY};
        }

        .no-video-message {
          display: flex;
          flex-direction: column;
          align-items: center;
          font-size: 16px;
          line-height: normal;
        }

        .icon {
          opacity: 0.5;
        }

        .no-video-message span {
          opacity: 0.5;
          font-weight: 400;
        }
      `}</style>
    </>
  );
};
