import { FC, useRef, useState, useEffect, useCallback } from "react";
import { useSetMapView } from "../logic/useSetMapView";
import { Dimensions } from "../../constants/Constants";
import { NadeLight } from "../../nade/models/NadeLight";
import { CsgoMap } from "../models/CsGoMap";
import { useWindowSize } from "../../shared-components/MinSizeRender";
import { AddNadeButton } from "./AddNadeButton";
import { NoNadesMessage } from "./NoNadesMessage";
import { MapIcons } from "./MapIcons";
import { BattleRoyalButton } from "./EloGame/BattleRoyalButton";
import { checkShouldShowBattleRoyalButton } from "../logic/useCanDisplayBattleRoyal";
import { MapLoadingScreen } from "./MapLoadingScreen";

type Props = {
  nadeClusters: NadeLight[][];
  map: CsgoMap;
  onClusterClick: (cluster: NadeLight[]) => void;
  isLoading: boolean;
  onStartEloGame: (nades: NadeLight[][]) => void;
};

const MapViewScreen: FC<Props> = ({
  map,
  onClusterClick,
  isLoading,
  nadeClusters,
  onStartEloGame,
}) => {
  const windowSize = useWindowSize();
  const { mapView } = useSetMapView();
  const [mapSize, setMapSize] = useState<number>();
  const mapViewRef = useRef<HTMLDivElement>(null);
  const shouldShowBattleRoyalButton =
    checkShouldShowBattleRoyalButton(nadeClusters);

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

  const onStartRatingGame = useCallback(() => {
    onStartEloGame(nadeClusters);
  }, [nadeClusters, onStartEloGame]);

  if (mapView === "list") {
    return null;
  }

  const canvasSize = mapSize;
  const hasNades = nadeClusters.length;
  const showNoNadesView = !hasNades && !isLoading;

  return (
    <>
      <div id="mapview-wrap" ref={mapViewRef}>
        <div
          className={showNoNadesView ? "no-nades-wrap" : "no-nades-wrap hide"}
        >
          <NoNadesMessage />
        </div>

        <div
          id="rating-game"
          className={shouldShowBattleRoyalButton ? "show" : "hide"}
        >
          <BattleRoyalButton onClick={onStartRatingGame} />
        </div>

        <div id="ad-nade-wrapper">
          <AddNadeButton />
        </div>
        <div className="mapview-dark-bg">
          <div id="mapview">
            {!isLoading && (
              <MapIcons
                clusters={nadeClusters}
                visible={true}
                canvasSize={canvasSize || 0}
                onClusterClick={onClusterClick}
              />
            )}

            <MapLoadingScreen isLoading={isLoading} />
          </div>
        </div>
      </div>

      <style jsx>{`
        .no-nades-wrap {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.75);
          z-index: 1;
          border-radius: ${Dimensions.BORDER_RADIUS};
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 1;
          transition: opacity 0.3s;
        }

        .no-nades-wrap.hide {
          opacity: 0;
          pointer-events: none;
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
          z-index: 2;
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

        #rating-game {
          position: absolute;
          top: ${Dimensions.GUTTER_SIZE}px;
          left: ${Dimensions.GUTTER_SIZE}px;
          z-index: 1;
          opacity: 1;
          transition: opacity 0.3s;
        }

        #rating-game.hide {
          opacity: 0;
          pointer-events: none;
        }
      `}</style>
    </>
  );
};

export default MapViewScreen;
