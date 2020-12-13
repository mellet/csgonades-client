import React, { FC, memo, useEffect } from "react";
import { CsgoMap } from "../nade-data/Nade/CsGoMap";
import { NadeLight } from "../nade-data/Nade/Nade";
import { MapPageNades } from "./components/MapPageNades";
import { useMapChangeHandler } from "../store/MapStore/hooks/useMapChangeHandler";
import { SEO } from "../common/SEO";
import { capitalize } from "../utils/Common";
import FilterBar from "./components/nadefilter/FilterBar";
import { MapViewSuggested } from "./components/SuggestedNades/MapViewSuggested";
import { useOnNadeClusterClick } from "./components/SuggestedNades/useOnNadeClick";
import { useSetMapView } from "../store/MapStore/hooks/useSetMapView";
import MapViewScreen from "./components/MapViewScreen";
import { isMobileOnly } from "react-device-detect";
import { Dimensions } from "../constants/Constants";

const isServer = typeof window === "undefined";

type Props = {
  map: CsgoMap;
  allNades: NadeLight[];
};

export const MapMain: FC<Props> = memo(({ map, allNades }) => {
  const { mapView, setMapView } = useSetMapView();

  useMapChangeHandler(allNades);

  useEffect(() => {
    if (isMobileOnly) {
      setMapView("list");
    }
  }, [setMapView]);

  const {
    onNadeClusterClick,
    suggestedNades,
    dismissSuggested,
  } = useOnNadeClusterClick();

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

      <div id="nade-page">
        <div id="filter">
          <div className="sticky">
            <FilterBar />
          </div>
        </div>
        <div id="nade-nades">
          {mapView === "list" && <MapPageNades allNades={allNades} />}

          <MapViewSuggested
            nades={suggestedNades}
            onDismiss={dismissSuggested}
          />

          {displayMapOverview && (
            <MapViewScreen
              map={map}
              allNades={allNades}
              onClusterClick={onNadeClusterClick}
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
        }

        #filter {
          grid-area: filter;
        }

        .sticky {
          position: sticky;
          top: 16px;
        }

        #nade-nades {
          flex: 1;
          padding: ${Dimensions.GUTTER_SIZE}px;
          grid-area: nades;
          width: 100%;
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
