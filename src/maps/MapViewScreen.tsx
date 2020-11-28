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

  return (
    <>
      <div id="mapview-wrap" ref={mapViewRef}>
        <div id="mapview-absolute">
          <div id="mapview-screen">
            {true && (
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
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        #mapview-wrap {
          position: relative;
          background: #151515;
          border-radius: 5px;
          overflow: hidden;
          height: calc(100vh - ${Dimensions.HEADER_HEIGHT}px - (16px * 2));
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
