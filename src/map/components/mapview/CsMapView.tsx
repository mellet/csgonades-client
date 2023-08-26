import { FC, useCallback, useEffect, useRef, useState } from "react";
import Konva from "konva";
import { Stage, Layer, Image } from "react-konva";
import useImage from "use-image";
import { EditStartLocation } from "./Polygon";
import { useMapStartLocations } from "../../data/useNadeEndLocations";
import { CsMap } from "../../models/CsGoMap";
import {
  NadeStartLocation,
  NadeStartLocationCreate,
} from "../../models/NadeStartLocation";
import { StartLocations } from "./StartLocation";
import { CsCanvasCoordinate } from "../../../nade/models/MapCoordinates";
import { CreateStartLocation } from "./CreateStartLocation";
import { Toolbar } from "./Toolbar";
import { EditPane } from "./EditPane";

export type Coordinate = {
  id: string;
  x: number;
  y: number;
};

type Props = {
  csMap: CsMap;
};

export const CsMapView: FC<Props> = ({ csMap }) => {
  const konvaRef = useRef<Konva.Stage>(null);
  const { mapLocations, addMapStartLocation, updateMapStartLocation } =
    useMapStartLocations(csMap);
  const [selectedLocation, setSelectedLocation] =
    useState<NadeStartLocation | null>(null);
  const [createLocation, setCreateLocation] =
    useState<NadeStartLocationCreate | null>(null);
  const [showEditPane, setShowEditPane] = useState(false);

  const onCallOutChange = useCallback((calloutName: string) => {
    console.log("Updateing callout", calloutName);
    setSelectedLocation((curVal) => {
      if (!curVal) return curVal;
      return {
        ...curVal,
        calloutName,
      };
    });
  }, []);

  const onStageClick = useCallback(
    (evt: Konva.KonvaEventObject<MouseEvent>) => {
      if (createLocation) {
        const stage = evt.target.getStage();
        const position = stage?.getPointerPosition();
        const zoom = stage?.scaleX();

        if (!position || !zoom) return;

        const realX = position.x / zoom;
        const realY = position.y / zoom;
        setCreateLocation((curCreateLocation) => {
          if (!curCreateLocation) {
            return null;
          }
          return {
            ...curCreateLocation,
            position: [...curCreateLocation.position, { x: realX, y: realY }],
          };
        });
      }
    },
    [createLocation]
  );

  const onSaveEdit = useCallback(() => {
    if (!selectedLocation) {
      return;
    }
    console.log("Saving edit", selectedLocation);
    updateMapStartLocation({
      id: selectedLocation.id,
      position: selectedLocation.position,
      calloutName: selectedLocation.calloutName,
    });
    setSelectedLocation(null);
  }, [selectedLocation, updateMapStartLocation]);

  const onFinishShape = useCallback(() => {
    if (!createLocation) return;
    addMapStartLocation(createLocation);
    setCreateLocation(null);
  }, [addMapStartLocation, createLocation]);

  const onUpdateSelectedPosition = (position: CsCanvasCoordinate[]) => {
    setSelectedLocation((cur) => {
      if (!cur) {
        return cur;
      }

      return {
        ...cur,
        position,
      };
    });
  };

  useEffect(() => {
    if (!konvaRef || !konvaRef.current) {
      return;
    }

    const stage = konvaRef.current;

    const scaleFactor = stage.width() / 1024;

    stage.scaleX(scaleFactor);
    stage.scaleY(scaleFactor);
  }, []);

  const onNew = useCallback(() => {
    setCreateLocation({ calloutName: "", map: csMap, position: [] });
  }, [csMap]);

  return (
    <>
      <div className="konva-stage">
        <Toolbar
          displayEditActions={Boolean(selectedLocation)}
          displayAddActions={Boolean(createLocation)}
          onSaveEdit={onSaveEdit}
          onCancelEdit={() => {
            setSelectedLocation(null);
          }}
          onCreateNew={onNew}
          onSaveNew={onFinishShape}
          onCancelNew={() => setCreateLocation(null)}
          onToggleEditPane={() => setShowEditPane((show) => !show)}
        />

        {showEditPane && selectedLocation && (
          <EditPane
            mapStartLocation={selectedLocation}
            onCallOutChange={onCallOutChange}
          />
        )}

        <Stage ref={konvaRef} width={650} height={650} onClick={onStageClick}>
          <Layer>
            <MapImage />
            {!selectedLocation && !createLocation && (
              <StartLocations
                startLocations={mapLocations}
                onStartLocationSelected={(sL) => setSelectedLocation(sL)}
              />
            )}
          </Layer>

          <Layer>
            {selectedLocation && !createLocation && (
              <EditStartLocation
                startLocation={selectedLocation}
                onUpdatePosition={onUpdateSelectedPosition}
              />
            )}
            {createLocation && (
              <CreateStartLocation coordinates={createLocation.position} />
            )}
          </Layer>
        </Stage>
      </div>
      <style jsx>{`
        .konva-stage {
          border: 1px solid red;
          width: 650px;
          height: 650px;
          position: relative;
        }
      `}</style>
    </>
  );
};

const MapImage = () => {
  const [image] = useImage("/mapsoverlays/mirage.jpg");
  return <Image image={image} width={1024} height={1024} />;
};
