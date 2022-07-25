import { FC, MouseEventHandler } from "react";
import { NadeLight } from "../../../nade/models/Nade";
import { NadeItem } from "../../../nade/components/NadeItem/NadeItem";
import { FaTimes } from "react-icons/fa";
import { CsgnList } from "../../../shared-components/list/CsgnList";
import { Dimensions } from "../../../constants/Constants";
import { useTheme } from "../../../core/settings/SettingsHooks";
import { useGa } from "../../../utils/Analytics";
import { SortByBar } from "./SortByBar";
import useSortedNades from "./useSortedNades";
import { TeamSelector } from "../nadefilter/component/TeamSelector";
import { TickratePicker } from "../nadefilter/component/TickratePicker";
import { AdUnit } from "../../../shared-components/adunits/AdUnit";

type Props = {
  nades: NadeLight[];
  onDismiss: () => void;
};

const MAX_MODAL_WIDTH = 1400;

export const MapViewSuggested: FC<Props> = ({ nades, onDismiss }) => {
  const { colors } = useTheme();
  const sortedNades = useSortedNades(nades);
  const ga = useGa();
  const numNades = nades.length;
  const showAdUnit = numNades <= 8;

  const stopPropagation: MouseEventHandler<HTMLDivElement> = (e) => {
    e.stopPropagation();
  };

  function renderItem(item: NadeLight) {
    return (
      <div onClick={stopPropagation}>
        <NadeItem nade={item} />
      </div>
    );
  }

  function keyExtractor(item: NadeLight) {
    return item.id;
  }

  const onBackgroundClick: MouseEventHandler<HTMLDivElement> = (e) => {
    e.stopPropagation();

    ga.event({
      category: "map_page",
      action: "close_suggested_nades_bg",
    });

    onDismiss();
  };

  const onDismissCloseClick: MouseEventHandler<HTMLDivElement> = (e) => {
    e.stopPropagation();

    ga.event({
      category: "map_page",
      action: "close_suggested_nades_btn",
    });

    onDismiss();
  };

  return (
    <>
      <div className="map-view-wrapper" onClick={onBackgroundClick}>
        <div className="close-btn" onClick={onDismissCloseClick}>
          <FaTimes />
        </div>

        <div className="title">
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
          </div>
        </div>

        <div className="nade-list">
          {sortedNades && (
            <>
              <CsgnList<NadeLight>
                data={sortedNades}
                renderItem={renderItem}
                keyExtractor={keyExtractor}
                enableAds={false}
              />
            </>
          )}
        </div>

        {showAdUnit && (
          <div className="ad-wrap">
            <div className="ad-unit">
              <AdUnit name="fixed728x90" />
            </div>
          </div>
        )}
      </div>
      <style jsx>{`
        .filter-wrap {
          display: flex;
          align-items: flex-end;
        }

        .filters {
          margin-left: ${Dimensions.GUTTER_SIZE}px;
          display: flex;
        }

        .filter-btn {
          margin-right: ${Dimensions.GUTTER_SIZE}px;
        }

        .map-view-wrapper {
          position: fixed;
          top: 0;
          bottom: 0;
          right: 0;
          left: 0;
          z-index: 800;
          display: flex;
          align-items: center;
          flex-direction: column;
          background: rgba(0, 0, 0, 0.7);
          overflow-y: auto;
          padding-right: ${Dimensions.GUTTER_SIZE * 4}px;
          padding-left: ${Dimensions.GUTTER_SIZE * 4}px;
        }

        .title {
          margin-top: ${Dimensions.GUTTER_SIZE * 2}px;
          width: 100%;
          max-width: ${MAX_MODAL_WIDTH}px;
          z-index: 801;
        }

        .title-content {
          padding: ${Dimensions.GUTTER_SIZE / 2}px ${Dimensions.GUTTER_SIZE}px;
          background: ${colors.DP03};
          border-top-left-radius: 8px;
          border-top-right-radius: 8px;
          border: 1px solid ${colors.BORDER};
        }

        .nade-list {
          max-width: ${MAX_MODAL_WIDTH}px;
          width: 100%;
          background: ${colors.DP00};
          padding: ${Dimensions.GUTTER_SIZE}px;
          border: 1px solid ${colors.BORDER};
          border-top: none;
          margin-bottom: ${Dimensions.GUTTER_SIZE * 2}px;
          border-bottom-left-radius: 8px;
          border-bottom-right-radius: 8px;
        }

        .close-btn {
          position: fixed;
          top: ${Dimensions.GUTTER_SIZE}px;
          right: ${Dimensions.GUTTER_SIZE}px;
          grid-area: close;
          font-size: 20px;
          justify-self: end;
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

        .ad-wrap {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          display: flex;
          justify-content: space-around;
        }

        .ad-unit {
          width: 728px;
          height: 90px;
        }

        @keyframes fadeId {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </>
  );
};
