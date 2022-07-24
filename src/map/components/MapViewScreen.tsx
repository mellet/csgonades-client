import { FC, useRef, useState, useEffect } from "react";
import { useSetMapView } from "../logic/useSetMapView";
import { Dimensions } from "../../constants/Constants";
import { useNadeClusters } from "../logic/useNadesForMapView";
import { NadeLight } from "../../nade/models/Nade";
import { CsgoMap } from "../models/CsGoMap";
import { useFilterServerSideNades } from "../logic/useFilteredNades";
import { useWindowSize } from "../../shared-components/MinSizeRender";
import { AddNadeButton } from "./AddNadeButton";
import { NoNadesMessage } from "./NoNadesMessage";
import { MapIcons } from "./MapIcons";
import { FaSpinner } from "react-icons/fa";
import { CSGNIcon } from "../../nade/components/NadeStatus/CSGNIcon";
import { useTheme } from "../../core/settings/SettingsHooks";

type Props = {
  allNades: NadeLight[];
  map: CsgoMap;
  onClusterClick: (cluster: NadeLight[]) => void;
  isLoading: boolean;
};

const MapViewScreen: FC<Props> = ({
  allNades,
  map,
  onClusterClick,
  isLoading,
}) => {
  const windowSize = useWindowSize();
  const filteredNades = useFilterServerSideNades(allNades);
  const { mapView } = useSetMapView();
  const [mapLoaded, setMapLoaded] = useState(false);
  const [mapSize, setMapSize] = useState(0);
  const mapViewRef = useRef<HTMLDivElement>(null);
  const clusters = useNadeClusters(filteredNades);
  const { colors } = useTheme();

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

              {!hasNades && !isLoading && (
                <div className="no-nades-wrap">
                  <NoNadesMessage />
                </div>
              )}

              {isLoading && (
                <span className="spinner">
                  <div className="spinner-content">
                    <p>Loading nades</p>
                    <CSGNIcon spin icon={<FaSpinner size={30} />} size={30} />
                  </div>
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .spinner {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          z-index: 999;
        }

        .spinner-content {
          border: 1px solid ${colors.PRIMARY};
          background: ${colors.DP03};
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 10px ${Dimensions.GUTTER_SIZE}px;
          color: ${colors.TEXT};
        }

        .spinner-content p {
          font-size: 16px;
          font-weight: 500;
          margin: 0;
          padding: 0;
          margin-right: ${Dimensions.GUTTER_SIZE / 2}px;
        }

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
          border-radius: 8px;
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
          pointer-events: none;
        }
      `}</style>
    </>
  );
};

export default MapViewScreen;
