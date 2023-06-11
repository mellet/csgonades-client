import { FC, MouseEventHandler } from "react";
import { NadeLight } from "../../../nade/models/Nade";
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
          <NadePreviewHeader onDismiss={onDismissCloseClick} />
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
          padding: 0px ${Dimensions.GUTTER_SIZE * 2}px;
        }

        .filter-header {
          position: sticky;
          top: 0;
          width: 100%;
          max-width: ${MAX_MODAL_WIDTH}px;
          z-index: 999;
          margin: 0 auto;
        }

        .suggested-main {
          width: 100%;
          max-width: ${MAX_MODAL_WIDTH}px;
          margin: 0px 50px;
          margin-bottom: 100px;
        }

        .nade-list {
          max-width: ${MAX_MODAL_WIDTH}px;
          width: 100%;
          background: ${colors.DP00};
          padding: ${Dimensions.GUTTER_SIZE}px;
          border: 1px solid ${colors.BORDER};
          border-top: none;
          border-radius: 8px;
        }
      `}</style>
    </>
  );
};
