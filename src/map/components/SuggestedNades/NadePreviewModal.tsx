import { FC, MouseEventHandler } from "react";
import { NadeLight } from "../../../nade/models/NadeLight";
import { NadeItem } from "../../../nade/components/NadeItem/NadeItem";
import { CsgnList } from "../../../shared-components/list/CsgnList";
import { Dimensions } from "../../../constants/Constants";
import { useTheme } from "../../../core/settings/useTheme";
import { useGa } from "../../../utils/Analytics";
import useSortedNades from "./useSortedNades";
import { NadePreviewHeader } from "./NadePreviewHeader";

type Props = {
  nades: NadeLight[];
  onDismiss: () => void;
};

const MAX_MODAL_WIDTH = 1420;

export const NadePreviewModal: FC<Props> = ({ nades, onDismiss }) => {
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
        <div className="filter-header">
          <div className="header-inner">
            <NadePreviewHeader onDismiss={onDismissCloseClick} />
          </div>
        </div>
        <div className="suggested-main">
          <div className="nade-list" onClick={(e) => e.stopPropagation()}>
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
          align-items: center;
          flex-direction: column;
          background: rgba(0, 0, 0, 0.7);
          overflow-y: auto;
          padding-bottom: 50px;
        }

        .filter-header {
          position: sticky;
          top: 0;
          width: 100%;
          z-index: 999;
          display: flex;
          justify-content: center;
          background: ${colors.DP03};
          border-bottom: 1px solid ${colors.BORDER};
          box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.2);
        }

        .header-inner {
          width: 100%;
          padding: 0px ${Dimensions.GUTTER_SIZE * 1.5}px;
          max-width: ${MAX_MODAL_WIDTH}px;
        }

        .suggested-main {
          width: 100%;
          margin: 0px 50px;
          padding: 0px ${Dimensions.GUTTER_SIZE * 1.5}px;
          max-width: ${MAX_MODAL_WIDTH}px;
        }

        .nade-list {
          width: 100%;
          background: ${colors.DP00};
          padding: ${Dimensions.GUTTER_SIZE}px;
          border: 1px solid ${colors.BORDER};
          border-top: none;
          border-bottom-left-radius: 8px;
          border-bottom-right-radius: 8px;
        }
      `}</style>
    </>
  );
};
