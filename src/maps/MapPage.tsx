import React, { FC, memo, Suspense } from "react";
import { CsgoMap } from "../nade-data/Nade/CsGoMap";
import { NadeLight } from "../nade-data/Nade/Nade";
import { MapPageNades } from "./MapPageNades";
import { useMapChangeHandler } from "../store/MapStore/hooks/useMapChangeHandler";
import { SEO } from "../layout/SEO";
import { capitalize } from "../utils/Common";
import { LayoutWithSidebar } from "../common/LayoutWithSidebar";
import { MapPageSidebar } from "./MapPageSidebar";
import { Dimensions } from "../constants/Constants";
import FilterBar from "./nadefilter/FilterBar";
import { MapViewSuggested } from "./MapViewSuggested";
import { useOnNadeClick } from "./SuggestedNades/useOnNadeClick";
import { useFilterServerSideNades } from "../store/MapStore/hooks/useFilteredNades";
import { useSetMapView } from "../store/MapStore/hooks/useSetMapView";

const MapViewScreen = React.lazy(() => import("./MapViewScreen"));

const isServer = typeof window === "undefined";

type Props = {
  map: CsgoMap;
  allNades: NadeLight[];
};

export const MapPage: FC<Props> = memo(({ map, allNades }) => {
  const { mapView } = useSetMapView();
  useMapChangeHandler(allNades);
  const filteredNades = useFilterServerSideNades(allNades);

  const { onNadeClick, suggestedNades, dismissSuggested } = useOnNadeClick(
    filteredNades
  );

  const displayMapOverview: boolean = mapView === "overview" && !isServer;

  return (
    <>
      <SEO
        title={mapPageTitleSeo(map)}
        canonical={`/maps/${map}`}
        description={`Find and learn the best smoke, flashbang, molotov and grenade spots for ${capitalize(
          map
        )}. Browse our large collection of nades for CS:GO.`}
      />

      <LayoutWithSidebar
        key={"map-" + map}
        sidebar={<MapPageSidebar map={map} nades={allNades} />}
      >
        <div id="nade-page">
          <div id="nade-nades">
            <div id="extra-options">
              <FilterBar></FilterBar>
            </div>

            {mapView === "list" && <MapPageNades allNades={allNades} />}

            <MapViewSuggested
              nades={suggestedNades}
              onDismiss={dismissSuggested}
            />

            {displayMapOverview && (
              <Suspense fallback={<></>}>
                <MapViewScreen
                  map={map}
                  allNades={allNades}
                  onNadePositionClick={onNadeClick}
                />
              </Suspense>
            )}
          </div>
        </div>
      </LayoutWithSidebar>
      <style jsx>{`
        #nade-page {
          position: relative;
          height: calc(100vh - ${Dimensions.HEADER_HEIGHT}px);
          width: 100%;
          overflow: hidden;
        }

        #nade-nades {
          flex: 1;
          height: calc(100vh - ${Dimensions.HEADER_HEIGHT}px);
          padding: 16px;
          overflow-y: auto;
          grid-area: overview;
        }

        #extra-options {
          margin-bottom: 16px;
          height: 40px;
        }
      `}</style>
    </>
  );
});

function mapPageTitleSeo(map: CsgoMap) {
  if (!map) {
    return "Not found";
  }

  return `${capitalize(map)} Smokes, Flashes and Molotovs`;
}
