import { FC, useEffect, useRef, useState } from "react";
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

type Props = {
  csMap: CsMap;
  onDisplayNadesForLocation: (displayNades: DisplayNades) => void;
};

export const NewMapView: FC<Props> = ({ csMap, onDisplayNadesForLocation }) => {
  const konvaRef = useRef<Konva.Stage>(null);
  const { byType } = useFilterByType();
  const { mapNadeLocations } = useMapNadeLocations(csMap, byType);
  const [selectedMapNadeLocation, setSelectedMapNadeLocation] =
    useState<MapNadeLocations | null>(null);

  useEffect(() => {
    if (!konvaRef || !konvaRef.current) {
      return;
    }

    const stage = konvaRef.current;

    const scaleFactor = stage.width() / 1024;

    stage.scaleX(scaleFactor);
    stage.scaleY(scaleFactor);
  }, []);

  return (
    <>
      <div>
        <Stage ref={konvaRef} width={650} height={650}>
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
      </div>
      <style jsx>{``}</style>
    </>
  );
};
