import { FC } from "react";
import { FaVideo } from "react-icons/fa";
import { useTheme } from "../../../core/settings/useTheme";
import { CsGoYouTubePlayer } from "../VideoContainer/YouTubePlayer";

type Props = {
  youTubeId?: string;
};

export const VideoPreview: FC<Props> = ({ youTubeId }) => {
  const { colors } = useTheme();

  return (
    <>
      <div className="video-preview-container">
        {!youTubeId && (
          <div className="no-video-content">
            <div className="no-video-message">
              <span className="icon">
                <FaVideo size={20} />
              </span>
              <span>Preview</span>
            </div>
          </div>
        )}

        {youTubeId && <CsGoYouTubePlayer youTubeId={youTubeId} />}
      </div>
      <style jsx>{`
        .video-preview-container {
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
