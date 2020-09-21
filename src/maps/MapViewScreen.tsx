import { FC, useRef, useState, useEffect } from "react";
import { useSetMapView } from "../store/MapStore/hooks/useSetMapView";
import { Dimensions } from "../constants/Constants";
import { useNadesForMapView } from "../store/MapStore/hooks/useNadesForMapView";
import { NadeLight } from "../models/Nade/Nade";
import { MapPosIcon } from "./mapview2/MapPosIcon";
import { CsgoMap } from "../models/Nade/CsGoMap";
import { filterByCoords } from "../store/MapStore/hooks/helpers";
import { MapViewSuggested } from "./MapViewSuggested";
import { useFilterServerSideNades } from "../store/MapStore/hooks/useFilteredNades";
import { TypeFilter } from "./nadefilter/TypeFilter";
import { MapViewSelector } from "./nadefilter/MapViewSelectors";
import { TickrateSelector } from "./nadefilter/TickrateSelector";
import { FavFilterButton } from "./nadefilter/FavFilterButton";
import { useIsSignedIn } from "../store/AuthStore/AuthHooks";
import { ResetFilterButton } from "./nadefilter/ResetFilterButton";
import { useWindowSize } from "../common/MinSizeRender";
//import { useNadeModal } from "../store/MapStore/hooks/useNadeModal";
import { FilterByProButton } from "./nadefilter/FilterByProButton";
import Router from "next/router";

type Props = {
  map: CsgoMap;
  allNades: NadeLight[];
};

export const MapViewScreen: FC<Props> = ({ allNades, map }) => {
  //const { setNadeForModal } = useNadeModal();
  const windowSize = useWindowSize();
  const filteredNades = useFilterServerSideNades(allNades);
  const { mapView } = useSetMapView();
  const [mapLoaded, setMapLoaded] = useState(false);
  const [suggestedNades, setSuggestedNades] = useState<NadeLight[] | null>(
    null
  );
  const [mapWidth, setMapWidth] = useState(0);
  const isSignedIn = useIsSignedIn();
  const nades = useNadesForMapView(allNades);
  const mapViewRef = useRef<HTMLDivElement>(null);

  // Adjust mapview on resize
  useEffect(() => {
    if (mapViewRef.current) {
      setMapWidth(mapViewRef.current.offsetHeight);
    }
  }, [windowSize]);

  function onMapViewImageLoaded() {
    if (mapViewRef.current) {
      setMapWidth(mapViewRef.current.offsetHeight);
      setMapLoaded(true);
    }
  }

  function onNadeClick(pos: { x: number; y: number }) {
    const suggested = filterByCoords(filteredNades, pos);

    if (suggested.length === 1) {
      const nade = suggested[0];
      return Router.push("/nades/[nade]", `/nades/${nade.slug || nade.id}`);
      //return setNadeForModal(suggested[0]);
    }

    setSuggestedNades(suggested);
  }

  if (mapView === "list") {
    return null;
  }

  return (
    <>
      <div id="mapview-wrap">
        <MapViewSuggested
          onDismiss={() => setSuggestedNades(null)}
          nades={suggestedNades}
        />
        <div id="mapview-filters">
          <div className="space-below">
            <TypeFilter vertical />
          </div>

          <div className="space-below">
            <TickrateSelector vertical />
          </div>
          {isSignedIn && (
            <div className="space-below">
              <FavFilterButton vertical />
            </div>
          )}

          <div className="space-below">
            <FilterByProButton vertical />
          </div>

          <div className="space-below">
            <ResetFilterButton vertical />
          </div>
        </div>

        <div id="view-selector">
          <MapViewSelector vertical />
        </div>

        <div id="mapview-screen">
          <div id="mapview" ref={mapViewRef}>
            <img
              src={`/mapsoverlays/${map}.jpg`}
              onLoad={onMapViewImageLoaded}
            />
            {mapLoaded &&
              nades.map((n) => (
                <MapPosIcon
                  key={n.id}
                  nade={n}
                  mapWidth={mapWidth}
                  onPress={onNadeClick}
                />
              ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        #mapview-wrap {
          position: relative;
          display: grid;
          grid-template-columns: min-content 1fr min-content;
          grid-template-areas:
            "mpfilter mpoverview mpviewselector"
            "mpfilter mpoverview .";
          background: #151515;
          border-radius: 5px;
          overflow: hidden;
        }

        #mapview-screen {
          justify-self: center;
          align-self: center;
          grid-area: mpoverview;
          height: calc(
            100vh - ${Dimensions.HEADER_HEIGHT}px - ${Dimensions.NAV_HEIGHT}px -
              ${Dimensions.GUTTER_SIZE * 1.5}px
          );
          width: calc(
            100vh - ${Dimensions.HEADER_HEIGHT}px - ${Dimensions.NAV_HEIGHT}px -
              ${Dimensions.GUTTER_SIZE * 1.5}px
          );
          max-width: 800px;
          max-height: 800px;
        }

        #mapview {
          position: relative;
        }

        #view-selector {
          grid-area: mpviewselector;
          padding: ${Dimensions.GUTTER_SIZE}px;
          padding-left: 0;
        }

        #mapview-filters {
          grid-area: mpfilter;
          padding: ${Dimensions.GUTTER_SIZE}px;
          padding-right: 0;
        }

        #mapview img {
          width: 100%;
          display: block;
        }

        .space-below {
          margin-bottom: ${Dimensions.GUTTER_SIZE}px;
        }
      `}</style>
    </>
  );
};
