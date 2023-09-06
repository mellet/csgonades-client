import { FC, MouseEventHandler } from "react";
import { NadeLight } from "../../../nade/models/NadeLight";
import { NadeItem } from "../../../nade/components/NadeItem/NadeItem";
import { CsgnList } from "../../../shared-components/list/CsgnList";
import { Dimensions } from "../../../constants/Constants";
import { useTheme } from "../../../core/settings/useTheme";
import { useGa } from "../../../utils/Analytics";
import { useNadesForLocation } from "./useNadesForLocation";
import { NadePreviewHeader } from "../SuggestedNades/NadePreviewHeader";
import { useFilterNadeView } from "../../logic/useFilteredNades";
import { LoadingView } from "./LoadingView";
import { AdUnit } from "../../../shared-components/adunits/AdUnit";

export type DisplayNades = {
  mapStartLocationId: string;
  mapEndLocationId: string;
};

type Props = {
  displayNades: DisplayNades;
  onDismiss: () => void;
  onStartBattleRoyal: (nadeLocation: DisplayNades) => void;
};

const MAX_MODAL_WIDTH = 1420;

export const NadeListViewModal: FC<Props> = ({
  displayNades,
  onDismiss,
  onStartBattleRoyal,
}) => {
  const { colors } = useTheme();
  const { nades, isLoading } = useNadesForLocation(displayNades);
  const ga = useGa();

  const nadesToShow = useFilterNadeView(nades || []);

  const showBattleRoyal = (nades?.length || 0) >= 2;

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
            <NadePreviewHeader
              showBattleRoyal={showBattleRoyal}
              onDismiss={onDismissCloseClick}
              onStartBattleRoyal={() => {
                onStartBattleRoyal(displayNades);
                onDismiss();
              }}
            />
          </div>
        </div>
        <div className="suggested-main">
          <div className="nade-list" onClick={(e) => e.stopPropagation()}>
            {isLoading && <LoadingView />}

            {nadesToShow && !isLoading && (
              <>
                <CsgnList<NadeLight>
                  isLoading={isLoading}
                  data={nadesToShow}
                  renderItem={renderItem}
                  keyExtractor={keyExtractor}
                  enableAds={false}
                />
              </>
            )}
          </div>
          <div className="spacer"></div>
          <div className="ad-spot">
            <AdUnit name="nadeModal" />
          </div>
        </div>
      </div>
      <style jsx>{`
        .ad-spot {
          margin-top: 50px;
          text-align: center;
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
          display: flex;
          flex-direction: column;
          height: 100%;
        }

        .spacer {
          flex: 1;
          min-height:: 50px;
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
