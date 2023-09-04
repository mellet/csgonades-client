import { FC, useEffect, useMemo, useRef, useState } from "react";
import { Layer, Stage } from "react-konva";
import { MapImage } from "../../components/mapview/MapViewImage";
import Konva from "konva";
import { CsMap } from "../../models/CsGoMap";
import { useMapNadeLocations } from "../../data/useMapNadeLocations";
import { MapNadeLocations } from "../../models/MapNadeLocations";
import { GrenadeView } from "./GrenadeView";
import { StartLocations } from "../../components/mapview/StartLocation";
import { DisplayNades } from "../../components/NadeView/NadeView";
import { useFilterByType } from "../../logic/useFilterByType";
import { useTheme } from "../../../core/settings/useTheme";
import { Dimensions } from "../../../constants/Constants";
import { useElementSize } from "usehooks-ts";
import { useGameMode } from "../../../core/useGameMode";
import { useFilterByTeam } from "../../logic/useFilterByTeam";
import { useFilterByTickrate } from "../../logic/useFilterByTickrate";

type Props = {
  csMap: CsMap;
  onDisplayNadesForLocation: (displayNades: DisplayNades) => void;
};

export const NewMapView: FC<Props> = ({ csMap, onDisplayNadesForLocation }) => {
  const { gameMode } = useGameMode();
  const { colors } = useTheme();
  const konvaRef = useRef<Konva.Stage>(null);
  const { byType } = useFilterByType();
  const { byTeam } = useFilterByTeam();
  const { byTickrate } = useFilterByTickrate();
  const { mapNadeLocations, isLoading } = useMapNadeLocations(csMap, byType);
  const [selectedMapNadeLocation, setSelectedMapNadeLocation] =
    useState<MapNadeLocations | null>(null);
  const [squareRef, { width, height }] = useElementSize();

  useEffect(() => {
    setSelectedMapNadeLocation(null);
  }, [gameMode, byType, csMap, byTeam, byTickrate]);

  const size = useMemo(() => {
    if (!width || !height) {
      return 0;
    }

    const smallestSide = width < height ? width : height;

    return smallestSide - 10;
  }, [width, height]);

  useEffect(() => {
    if (!konvaRef || !konvaRef.current || !size) {
      return;
    }

    const stage = konvaRef.current;

    const scaleFactor = stage.width() / 1024;

    stage.scaleX(scaleFactor);
    stage.scaleY(scaleFactor);
  }, [size, csMap, isLoading]);

  return (
    <>
      <div ref={squareRef} className="map-wrapper">
        {size && (
          <Stage ref={konvaRef} width={size} height={size}>
            <Layer>
              <MapImage csMap={csMap} />
              {selectedMapNadeLocation && (
                <StartLocations
                  startLocations={selectedMapNadeLocation.startPositions}
                  onStartLocationSelected={(startLocation) => {
                    onDisplayNadesForLocation({
                      mapStartLocationId: startLocation.id,
                      mapEndLocationId: selectedMapNadeLocation.endLocation.id,
                    });
                  }}
                />
              )}
              {mapNadeLocations && (
                <GrenadeView
                  csMap={csMap}
                  selectedLocationId={selectedMapNadeLocation?.endLocation.id}
                  mapNadeLocations={mapNadeLocations}
                  onNadeClick={setSelectedMapNadeLocation}
                  onUnselect={() => setSelectedMapNadeLocation(null)}
                />
              )}
            </Layer>
          </Stage>
        )}
      </div>
      <style jsx>{`
        .map-wrapper {
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: ${colors.DP01};
          border: 1px solid ${colors.BORDER};
          border-radius: ${Dimensions.BORDER_RADIUS};
        }
      `}</style>
    </>
  );
};