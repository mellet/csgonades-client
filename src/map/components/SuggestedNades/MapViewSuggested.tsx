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

type Props = {
  nades: NadeLight[] | null;
  onDismiss: () => void;
};

export const MapViewSuggested: FC<Props> = ({ nades, onDismiss }) => {
  const { colors } = useTheme();
  const sortedNades = useSortedNades(nades);
  const ga = useGa();

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
        <div className="title">
          <div className="title-content">
            <div onClick={stopPropagation}>
              <SortByBar />
            </div>
            <div className="close-btn" onClick={onDismissCloseClick}>
              <FaTimes />
            </div>
          </div>
        </div>

        <div className="mapview-wrapper">
          {sortedNades && (
            <>
              <div className="nade-list-wrap">
                <CsgnList<NadeLight>
                  data={sortedNades}
                  renderItem={renderItem}
                  keyExtractor={keyExtractor}
                  enableAds={false}
                />
              </div>
            </>
          )}
        </div>
      </div>
      <style jsx>{`
        .map-view-wrapper {
          position: fixed;
          top: 0;
          bottom: 0;
          right: 0;
          left: 0;
          z-index: 800;
          display: flex;
          justify-content: space-around;
          background: ${colors.DP03_transparent};
          overflow-y: auto;
        }

        .mapview-wrapper {
          max-width: 1210px;
          flex: 1;
        }

        .nade-list-wrap {
          padding: ${Dimensions.GUTTER_SIZE}px;
          padding-top: ${Dimensions.HEADER_HEIGHT + Dimensions.GUTTER_SIZE}px;
          padding-bottom: ${Dimensions.HEADER_HEIGHT +
          Dimensions.GUTTER_SIZE}px;
        }

        .title {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          padding: ${Dimensions.GUTTER_SIZE / 2}px ${Dimensions.GUTTER_SIZE}px;
          border-bottom: 2px solid ${colors.BORDER};
          background: ${colors.DP03};
          z-index: 801;
        }

        .title-content {
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          grid-template-areas: "msg . close";
          align-items: center;
          max-width: ${Dimensions.SITE_WIDTH}px;
        }

        .close-btn {
          grid-area: close;
          font-size: 24px;
          justify-self: end;
          color: rgba(255, 255, 255, 1);
          cursor: pointer;
          transition: color, background 0.3s;
          background: rgba(196, 12, 12, 0.7);
          border-radius: 50%;
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .close-btn:hover {
          color: rgba(255, 255, 255, 1);
          background: rgba(196, 12, 12, 1);
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
