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
  const [mapSize, setMapSize] = useState<number>();
  const mapViewRef = useRef<HTMLDivElement>(null);
  const clusters = useNadeClusters(filteredNades);
  const { colors } = useTheme();

  const mapUrl = `/mapsoverlays/${map}.jpg`;

  function recalcMapSize(offsetWidth: number, offsetHeight: number) {
    if (offsetWidth < offsetHeight) {
      setMapSize(offsetWidth);
    } else {
      setMapSize(offsetHeight);
    }
  }

  // Adjust mapview on resize
  useEffect(() => {
    if (mapViewRef.current) {
      const { offsetWidth, offsetHeight } = mapViewRef.current;
      recalcMapSize(offsetWidth, offsetHeight);
    }
  }, [windowSize]);

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
        <div className="mapview-dark-bg">
          <div id="mapview">
            <MapIcons
              clusters={clusters}
              visible={true}
              canvasSize={canvasSize || 0}
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
          right: 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        #mapview-wrap {
          position: relative;
          height: calc(100vh - ${Dimensions.HEADER_HEIGHT}px - (16px * 2));
        }

        .mapview-dark-bg {
          background: #151515;
          border-radius: 5px;
          height: ${canvasSize}px;
          width: 100%;
          display: flex;
          justify-content: center;
        }

        #ad-nade-wrapper {
          position: absolute;
          top: ${Dimensions.GUTTER_SIZE}px;
          right: ${Dimensions.GUTTER_SIZE}px;
          z-index: 1;
        }

        #mapview {
          position: relative;
          background: url(${mapUrl});
          height: 100%;
          width: 100%;
          background-size: contain;
          width: ${canvasSize}px;
          height: ${canvasSize}px;
        }
      `}</style>
    </>
  );
};

export default MapViewScreen;
