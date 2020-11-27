import { FC, useRef, useState, useEffect } from "react";
import { useSetMapView } from "../store/MapStore/hooks/useSetMapView";
import { Dimensions } from "../constants/Constants";
import { useNadeClusters } from "../store/MapStore/hooks/useNadesForMapView";
import { NadeLight } from "../nade-data/Nade/Nade";
import { MapPosIcon } from "./mapview/MapPosIcon";
import { CsgoMap } from "../nade-data/Nade/CsGoMap";
import { useFilterServerSideNades } from "../store/MapStore/hooks/useFilteredNades";
import { useWindowSize } from "../common/MinSizeRender";

type Props = {
  map: CsgoMap;
  allNades: NadeLight[];
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

  function recalcMapSize(offsetHeight: number, offsetWidth) {
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

  return (
    <>
      <div id="mapview-wrap" ref={mapViewRef}>
        <div id="mapview-screen">
          <div id="mapview">
            <img
              src={`/mapsoverlays/${map}.jpg`}
              onLoad={onMapViewImageLoaded}
            />
            {mapLoaded &&
              clusters.map((cluster) => {
                const nade = cluster[0];
                return (
                  <MapPosIcon
                    key={nade.id}
                    nade={nade}
                    cluster={cluster}
                    mapWidth={canvasSize}
                    numNades={cluster.length}
                    onPress={() => onClusterClick(cluster)}
                  />
                );
              })}
          </div>
        </div>
      </div>

      <style jsx>{`
        #mapview-wrap {
          position: relative;
          display: grid;
          grid-template-rows: 1fr;
          grid-template-areas: "mpoverview";
          background: #151515;
          border-radius: 5px;
          overflow: hidden;
          height: calc(100vh - ${Dimensions.HEADER_HEIGHT}px - (16px * 2));
        }

        #mapview-screen {
          justify-self: center;
          align-self: center;
          grid-area: mpoverview;
          height: ${canvasSize}px;
          width: ${canvasSize}px;
        }

        #ph {
          position: absolute;
          left: 0px;
          right: 0px;
          bottom: 0px;
          background: rgba(255, 255, 255, 0.1);
          height: 90px;
          overflow: hidden;
        }

        #mapview {
          position: relative;
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

export default MapViewScreen;
