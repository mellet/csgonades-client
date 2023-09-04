import { FC, MouseEventHandler } from "react";
import { FaTimes } from "react-icons/fa";
import { Dimensions } from "../../../constants/Constants";

type Props = {
  onDismiss: MouseEventHandler<HTMLDivElement>;
};

export const NadePreviewHeader: FC<Props> = ({ onDismiss }) => {
  const stopPropagation: MouseEventHandler<HTMLDivElement> = (e) => {
    e.stopPropagation();
  };

  return (
    <>
      <div className="filter-header" onClick={stopPropagation}>
        <div className="filter-wrapper">
          <div className="title-content">
            <div id="close-wrap">
              <div className="close-btn" onClick={onDismiss}>
                <FaTimes />
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .filter-header {
          width: 100%;
          display: flex;
        }

        .filter-wrapper {
          width: 100%;
        }

        .filters {
          display: flex;
        }

        .title-content {
          display: flex;
          justify-content: flex-end;
          padding-top: ${Dimensions.GUTTER_SIZE}px;
          padding-bottom: ${Dimensions.GUTTER_SIZE}px;
        }

        .close-btn {
          font-size: 20px;
          color: rgba(0, 0, 0, 0.8);
          cursor: pointer;
          transition: color, background 0.3s;
          background: rgba(230, 230, 230, 0.95);
          border-radius: 50%;
          width: 30px;
          height: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .close-btn:hover {
          color: rgba(255, 255, 255, 1);
          background: rgba(196, 12, 12, 1);
        }
      `}</style>
    </>
  );
};
