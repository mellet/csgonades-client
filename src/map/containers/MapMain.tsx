import React, { FC, memo, useState } from "react";
import { Dimensions, LayoutBreakpoint } from "../../constants/Constants";
import { NadeLight } from "../../nade/models/NadeLight";
import { SEO } from "../../shared-components/SEO";
import { capitalize } from "../../utils/Common";
import FilterBar from "../components/nadefilter/FilterBar";
import { NadePreviewModal } from "../components/SuggestedNades/NadePreviewModal";
import { useOnNadeClusterClick } from "../components/SuggestedNades/useOnNadeClick";
import { useSetMapView } from "../logic/useSetMapView";
import { CsMap } from "../models/CsGoMap";
import { FilterBarMobile } from "../components/nadefilter/FilterBarMobile";
import { NadeType } from "../../nade/models/NadeType";
import { useIsDeviceSize } from "../../core/layout/useDeviceSize";
import {
  BattleRoyalModal,
  useEloGame,
} from "../components/EloGame/BattleRoyalModal";
import { useNadeClusters } from "../logic/useNadesForMapView";
import MapViewScreen from "../components/MapViewScreen";
import dynamic from "next/dynamic";
import { NadeView } from "../components/NadeView/NadeView";

const NewMapView = dynamic(
  () => import("./NewMapView/NewMapView").then((m) => m.NewMapView),
  {
    ssr: false,
  }
);

const isServer = typeof window === "undefined";

type Props = {
  csMap: CsMap;
  allNades: NadeLight[];
  isLoading: boolean;
  initialType?: NadeType;
};

export const MapMain: FC<Props> = memo(({ csMap, allNades, isLoading }) => {
  const { mapView } = useSetMapView();
  const { isMobile } = useIsDeviceSize();
  const isOverviewView = mapView === "overview";
  const nadeClusters = useNadeClusters(allNades);

  const { onNadeClusterClick, suggestedNades, dismissSuggested } =
    useOnNadeClusterClick();
  const { eloNades, showEloGame, closeEloGame, finishEloGame } = useEloGame();
  const [displayNades, setDisplayNades] = useState<{
    mapStartLocationId: string;
    mapEndLocationId: string;
  }>();

  const displayMapOverview = !isServer;

  return (
    <>
      <SEO
        title={mapPageTitleSeo(csMap)}
        canonical={`/maps/${csMap}`}
        description={`Find and learn the best smoke, flashbang, molotov and grenade spots for ${capitalize(
          csMap
        )}. Browse our large collection of nades for CS:GO.`}
      />

      <div id="nade-page">
        <div id="filter">
          {isMobile ? (
            <FilterBarMobile />
          ) : (
            <div className="sticky">
              <FilterBar />
            </div>
          )}
        </div>
        <div id="nade-nades">
          {suggestedNades && (
            <NadePreviewModal
              nades={suggestedNades}
              onDismiss={dismissSuggested}
            />
          )}

          {eloNades && (
            <BattleRoyalModal
              nadeClusters={eloNades}
              onClose={closeEloGame}
              onFinish={finishEloGame}
            />
          )}

          <NewMapView
            csMap={csMap}
            onDisplayNadesForLocation={setDisplayNades}
          />

          {true && displayMapOverview && isOverviewView && (
            <MapViewScreen
              isLoading={isLoading}
              map={csMap}
              nadeClusters={nadeClusters}
              onClusterClick={onNadeClusterClick}
              onStartEloGame={showEloGame}
            />
          )}

          {displayNades && (
            <NadeView
              displayNades={displayNades}
              onDismiss={() => setDisplayNades(undefined)}
            />
          )}
        </div>
      </div>
      <style jsx>{`
        #nade-page {
          position: relative;
          width: 100%;
          display: grid;
          grid-template-columns: min-content 1fr;
          grid-template-areas: "filter nades";
          grid-column-gap: ${Dimensions.GUTTER_SIZE}px;
        }

        #filter {
          grid-area: filter;
        }

        .sticky {
          position: sticky;
          top: ${Dimensions.HEADER_HEIGHT + Dimensions.GUTTER_SIZE}px;
        }

        #nade-nades {
          flex: 1;
          grid-area: nades;
          width: 100%;
        }

        @media only screen and (max-width: ${LayoutBreakpoint.MOBILE}px) {
          #nade-page {
            position: relative;
            width: 100%;
            display: grid;
            grid-template-columns: 1fr;
            grid-template-areas:
              "filter"
              "nades";
            grid-row-gap: ${Dimensions.GUTTER_SIZE}px;
          }

          #filter {
            padding: ${Dimensions.GUTTER_SIZE}px;
            padding-bottom: 0;
          }
        }
      `}</style>
    </>
  );
});

function mapPageTitleSeo(map: CsMap) {
  if (!map) {
    return "Not found";
  }

  return `${capitalize(map)} Smokes, Flashes and Molotovs`;
}
