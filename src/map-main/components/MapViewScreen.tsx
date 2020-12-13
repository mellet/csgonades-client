import { FC, useRef, useState, useEffect } from "react";
import { useSetMapView } from "../../store/MapStore/hooks/useSetMapView";
import { Dimensions } from "../../constants/Constants";
import { useNadeClusters } from "../../store/MapStore/hooks/useNadesForMapView";
import { NadeLight } from "../../nade-data/Nade/Nade";
import { CsgoMap } from "../../nade-data/Nade/CsGoMap";
import { useFilterServerSideNades } from "../../store/MapStore/hooks/useFilteredNades";
import { useWindowSize } from "../../common/MinSizeRender";
import { AddNadeButton } from "./AddNadeButton";
import { NoNadesMessage } from "./NoNadesMessage";
import { MapIcons } from "./MapIcons";

type Props = {
  allNades: NadeLight[];
  map: CsgoMap;
  onClusterClick: (cluster: NadeLight[]) => void;
};

const MapViewScreen: FC<Props> = ({ allNades, map, onClusterClick }) => {
  const windowSize = useWindowSize();
  const filteredNades = useFilterServerSideNades(allNades);
  const { mapView } = useSetMapView();
  const [mapLoaded, setMapLoaded] = useState(false);
  const [mapSize, setMapSize] = useState(0);
  const mapViewRef = useRef<HTMLDivElement>(null);
  const clusters = useNadeClusters(filteredNades);

  function recalcMapSize(offsetHeight: number, offsetWidth: number) {
    if (offsetHeight < offsetWidth) {
      setMapSize(offsetHeight);
    } else {
      setMapSize(offsetWidth);
    }
  }

  // Adjust mapview on resize
  useEffect(() => {
    if (mapViewRef.current) {
      const { offsetHeight, offsetWidth } = mapViewRef.current;
      recalcMapSize(offsetHeight, offsetWidth);
    }
  }, [windowSize]);

  function onMapViewImageLoaded() {
    if (mapViewRef.current) {
      const { offsetHeight, offsetWidth } = mapViewRef.current;
      setMapLoaded(true);
      recalcMapSize(offsetHeight, offsetWidth);
    }
  }

  if (mapView === "list") {
    return null;
  }

  const canvasSize = mapSize;
  const hasNades = clusters.length;

  return (
    <>
      <div id="mapview-wrap" ref={mapViewRef}>
        <div id="ad-nade-wrapper">
          <AddNadeButton />
        </div>
        <div id="mapview-absolute">
          <div id="mapview-screen">
            <div id="mapview">
              <img
                src={`/mapsoverlays/${map}.jpg`}
                onLoad={onMapViewImageLoaded}
              />
              <MapIcons
                clusters={clusters}
                visible={mapLoaded}
                canvasSize={canvasSize}
                onClusterClick={onClusterClick}
              />

              {!hasNades && (
                <div className="no-nades-wrap">
                  <NoNadesMessage />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .no-nades-wrap {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        #mapview-wrap {
          position: relative;
          background: #151515;
          border-radius: 5px;
          overflow: hidden;
          height: calc(100vh - ${Dimensions.HEADER_HEIGHT}px - (16px * 2));
        }

        #ad-nade-wrapper {
          position: absolute;
          top: ${Dimensions.GUTTER_SIZE}px;
          right: ${Dimensions.GUTTER_SIZE}px;
          z-index: 1;
        }

        #mapview-absolute {
          position: absolute;
          top: 0;
          left: 0;
          bottom: 0;
          right: 0;
          display: grid;
          grid-template-rows: 1fr;
          grid-template-areas: "mpoverview";
          overflow: hidden;
        }

        #mapview-screen {
          justify-self: center;
          align-self: center;
          grid-area: mpoverview;
          height: ${canvasSize}px;
          width: ${canvasSize}px;
        }

        #mapview {
          position: relative;
        }

        #mapview img {
          width: 100%;
          display: block;
        }
      `}</style>
    </>
  );
};

export default MapViewScreen;
