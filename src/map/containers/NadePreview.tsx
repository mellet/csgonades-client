import { FC } from "react";
import { NadeLight } from "../../nade/models/NadePartial";
import { NadeTitle } from "../../nade/components/NadeHeader/NadeTitle";
import { FaTimes } from "react-icons/fa";
import { Dimensions } from "../../constants/Constants";
import { CsGoYouTubePlayer } from "../../nade/components/VideoContainer/YouTubePlayer";

type Props = {
  partialNade: NadeLight;
  onDismiss: () => void;
};

export const NadePreview: FC<Props> = ({ onDismiss, partialNade }) => {
  const nade = partialNade;
  return (
    <>
      <div className="nade-preview-background" onClick={onDismiss}>
        <div className="nade-preview-container">
          <div className="nade-preview-header">
            <NadeTitle
              isOneWay={nade.oneWay}
              nadeEndPosition={nade.endPosition}
              nadeStartPosition={nade.startPosition}
              nadeType={nade.type}
            />
            <button className="close-button">
              <FaTimes />
            </button>
          </div>
          <div className="nade-preview-content">
            <div className="nade-preview-video">
              <CsGoYouTubePlayer youTubeId={nade.youTubeId} />
            </div>
            <div className="nade-description">
              <p>This is the nade description</p>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .nade-preview-background {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.6);
          z-index: 999;
          display: flex;
          justify-content: center;
          padding-top: ${Dimensions.GUTTER_SIZE}px;
          padding-bottom: ${Dimensions.GUTTER_SIZE}px;
        }

        .nade-preview-container {
          background: white;
          max-width: 900px;
          max-height: 80vw;
          border-radius: 5px;
          flex: 1;
          display: flex;
          flex-direction: column;
          box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
        }

        .nade-preview-header {
          display: flex;
          justify-content: space-between;
          padding: 15px;
        }

        .nade-preview-content {
          overflow-y: auto;
          height: 100%;
        }

        .nade-description {
          padding: ${Dimensions.GUTTER_SIZE}px;
        }

        .close-button {
          all: unset;
          cursor: pointer;
          color: #999;
        }
      `}</style>
    </>
  );
};
