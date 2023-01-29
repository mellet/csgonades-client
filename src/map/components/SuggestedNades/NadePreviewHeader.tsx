import { FC, MouseEventHandler } from "react";
import { FaTimes } from "react-icons/fa";
import { Dimensions } from "../../../constants/Constants";
import { useTheme } from "../../../core/settings/SettingsHooks";
import { AdUnit } from "../../../shared-components/adunits/AdUnit";
import { TeamSelector } from "../nadefilter/component/TeamSelector";
import { TickratePicker } from "../nadefilter/component/TickratePicker";
import { SortByBar } from "./SortByBar";

type Props = {
  onDismiss: MouseEventHandler<HTMLDivElement>;
};

export const NadePreviewHeader: FC<Props> = ({ onDismiss }) => {
  const { colors } = useTheme();
  const stopPropagation: MouseEventHandler<HTMLDivElement> = (e) => {
    e.stopPropagation();
  };

  return (
    <>
      <div className="filter-header" onClick={stopPropagation}>
        <div className="filter-wrapper">
          <div className="title-content">
            <div className="filter-wrap" onClick={stopPropagation}>
              <SortByBar />
              <div className="filters" onClick={stopPropagation}>
                <div className="filter-btn">
                  <TeamSelector />
                </div>
                <div className="filter-btn">
                  <TickratePicker />
                </div>
              </div>
            </div>
            <div className="ad-wrap">
              <div className="ad">
                <AdUnit name="nadeModalFixed" />
              </div>
            </div>
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
          grid-area: filter;
          width: 100%;
          margin: 0 auto;
        }

        .ad-wrap {
          grid-area: footer;
          display: flex;
          justify-content: space-around;
        }

        .ad {
          width: 728px;
          height: 90px;
        }

        .filter-wrap {
          display: flex;
          padding: 0px ${Dimensions.GUTTER_SIZE}px;
          align-self: center;
        }

        .filters {
          margin-left: ${Dimensions.GUTTER_SIZE}px;
          display: flex;
        }

        .filter-btn {
          margin-right: ${Dimensions.GUTTER_SIZE}px;
        }

        .title-content {
          display: flex;
          justify-content: space-between;
          background: ${colors.DP03};
          border-bottom: 1px solid ${colors.BORDER};
          border-bottom-left-radius: 8px;
          border-bottom-right-radius: 8px;
          box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.3);
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
          margin-right: ${Dimensions.GUTTER_SIZE}px;
          margin-top: ${Dimensions.GUTTER_SIZE}px;
        }

        .close-btn:hover {
          color: rgba(255, 255, 255, 1);
          background: rgba(196, 12, 12, 1);
        }
      `}</style>
    </>
  );
};
