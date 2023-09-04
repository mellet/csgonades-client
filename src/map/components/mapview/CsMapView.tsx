import { FC, useCallback, useEffect, useRef, useState } from "react";
import Konva from "konva";
import { Stage, Layer } from "react-konva";
import { EditStartLocation } from "./EditStartLocation";
import { useMapStartLocations } from "../../data/useMapStartLocations";
import { CsMap } from "../../models/CsGoMap";
import {
  MapStartLocation,
  MapStartLocationCreate,
} from "../../models/NadeStartLocation";
import { StartLocations } from "./StartLocation";
import { CsCanvasCoordinate } from "../../../nade/models/MapCoordinates";
import { CreateStartLocation } from "./CreateStartLocation";
import { Toolbar } from "./Toolbar";
import { EditPane } from "./EditPane";
import { MapEndLocation } from "../../models/NadeEndLocation";
import { EditEndLocation } from "./EditEndLocations";
import { NadeType } from "../../../nade/models/NadeType";
import { useMapEndLocations } from "../../data/useMapEndLocations";
import { EndLocations } from "./EndLocations";
import { MapImage } from "./MapViewImage";
import { useGameMode } from "../../../core/useGameMode";

type Props = {
  initCsMap: CsMap;
};

export const CsMapView: FC<Props> = ({ initCsMap }) => {
  const konvaRef = useRef<Konva.Stage>(null);
  const { gameMode } = useGameMode();
  const [csMap, setCsMap] = useState(initCsMap);
  const [nadeType, setNadeType] = useState<NadeType>("smoke");
  const [mode, setMode] = useState<"start" | "end">("start");
  const {
    mapStartLocations,
    addMapStartLocation,
    updateMapStartLocation,
    deleteMapStartLocation,
  } = useMapStartLocations(csMap, gameMode);
  const {
    mapEndLocations,
    addMapEndLocation,
    updateMapEndLocation,
    deleteMapEndLocation,
  } = useMapEndLocations(csMap, nadeType, gameMode);
  const [selectedLocation, setSelectedLocation] =
    useState<MapStartLocation | null>(null);
  const [createStartLocation, setcreateStartLocation] =
    useState<MapStartLocationCreate | null>(null);
  const [showEditPane, setShowEditPane] = useState(false);
  const [selectedEndLocation, setSelectedEndLocation] =
    useState<MapEndLocation | null>(null);

  const showStartLocations = mode === "start";
  const showEndLocations = mode === "end";
  const isEditing = Boolean(selectedEndLocation || selectedLocation);

  const onEndLocationClick = (endLocation: MapEndLocation) => {
    setcreateStartLocation(null);
    setSelectedEndLocation(endLocation);
    setShowEditPane(true);
  };

  const onCallOutChange = useCallback(
    (calloutName: string) => {
      if (mode === "start") {
        setSelectedLocation((curVal) => {
          if (!curVal) return curVal;
          return {
            ...curVal,
            calloutName,
          };
        });
      } else {
        setSelectedEndLocation((curVal) => {
          if (!curVal) return curVal;
          return {
            ...curVal,
            calloutName,
          };
        });
      }
    },
    [mode]
  );

  const onDeleteClick = useCallback(() => {
    if (selectedLocation) {
      deleteMapStartLocation(selectedLocation);
      setShowEditPane(false);
      setSelectedLocation(null);
    } else if (selectedEndLocation) {
      deleteMapEndLocation(selectedEndLocation);
      setShowEditPane(false);
      setSelectedEndLocation(null);
    }
  }, [
    deleteMapEndLocation,
    deleteMapStartLocation,
    selectedEndLocation,
    selectedLocation,
  ]);

  const onStageClick = useCallback(
    (evt: Konva.KonvaEventObject<MouseEvent>) => {
      if (createStartLocation) {
        const stage = evt.target.getStage();
        const position = stage?.getPointerPosition();
        const zoom = stage?.scaleX();

        if (!position || !zoom) return;

        const realX = position.x / zoom;
        const realY = position.y / zoom;

        if (mode === "start") {
          setcreateStartLocation((curCreateLocation) => {
            if (!curCreateLocation) {
              return null;
            }
            return {
              ...curCreateLocation,
              position: [...curCreateLocation.position, { x: realX, y: realY }],
            };
          });
        }
      }
    },
    [createStartLocation, mode]
  );

  const onSaveEdit = useCallback(() => {
    if (mode == "start") {
      if (!selectedLocation) {
        return;
      }
      updateMapStartLocation({
        id: selectedLocation.id,
        position: selectedLocation.position,
        calloutName: selectedLocation.calloutName,
        labelPosition: selectedLocation.labelPosition,
        gameMode: gameMode,
      });
      setSelectedLocation(null);
    } else {
      if (!selectedEndLocation) {
        return;
      }
      updateMapEndLocation({
        id: selectedEndLocation.id,
        calloutName: selectedEndLocation.calloutName,
        map: selectedEndLocation.map,
        position: selectedEndLocation.position,
        gameMode,
      });
      setSelectedEndLocation(null);
    }
  }, [
    mode,
    selectedEndLocation,
    selectedLocation,
    updateMapEndLocation,
    updateMapStartLocation,
    gameMode,
  ]);

  const onFinishShape = useCallback(() => {
    if (!createStartLocation) return;
    addMapStartLocation(createStartLocation);
    setcreateStartLocation(null);
  }, [addMapStartLocation, createStartLocation]);

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

  const onUpdateLabelPosition = (labelPosition: CsCanvasCoordinate) => {
    setSelectedLocation((cur) => {
      if (!cur) return cur;
      return { ...cur, labelPosition };
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
    setcreateStartLocation({
      calloutName: "",
      map: csMap,
      position: [],
      labelPosition: { x: 100, y: 100 },
      gameMode,
    });
  }, [csMap, gameMode]);

  return (
    <>
      <div className="konva-stage">
        <Toolbar
          mode={mode}
          selectedType={nadeType}
          onNadeTypeChange={setNadeType}
          displayEditActions={isEditing}
          displayAddActions={Boolean(createStartLocation)}
          onSaveEdit={onSaveEdit}
          onCancelEdit={() => {
            setSelectedLocation(null);
            setSelectedEndLocation(null);
          }}
          onCreateNew={onNew}
          onSaveNew={onFinishShape}
          onCancelNew={() => setcreateStartLocation(null)}
          onToggleEditPane={() => setShowEditPane((show) => !show)}
          onChangeCsMap={setCsMap}
          onSetMode={setMode}
          onCreateNewEndLocation={addMapEndLocation}
        />

        {showEditPane && (selectedLocation || selectedEndLocation) && (
          <EditPane
            key={selectedLocation?.id || selectedEndLocation?.id}
            mapStartLocation={selectedLocation || selectedEndLocation}
            onCallOutChange={onCallOutChange}
            onDeleteClick={onDeleteClick}
          />
        )}

        <Stage ref={konvaRef} width={650} height={650} onClick={onStageClick}>
          <Layer>
            <MapImage csMap={csMap} />
            {showStartLocations && mapStartLocations && (
              <StartLocations
                hideLocationId={selectedLocation?.id}
                startLocations={mapStartLocations}
                onStartLocationSelected={(sL) => {
                  setSelectedLocation(sL);
                  setShowEditPane(true);
                }}
              />
            )}
            {showEndLocations && mapEndLocations && (
              <EndLocations
                endLocations={mapEndLocations}
                onEndLocationSelected={onEndLocationClick}
                hideEndLocationId={selectedEndLocation?.id}
              />
            )}
          </Layer>

          <Layer>
            {selectedLocation && !createStartLocation && showStartLocations && (
              <EditStartLocation
                key={selectedLocation.id}
                startLocation={selectedLocation}
                onUpdatePosition={onUpdateSelectedPosition}
                onUpdateLabelPosition={onUpdateLabelPosition}
              />
            )}
            {createStartLocation && showStartLocations && (
              <CreateStartLocation coordinates={createStartLocation.position} />
            )}
            {selectedEndLocation && (
              <EditEndLocation
                key={selectedEndLocation.id}
                endLocation={selectedEndLocation}
                onUpdateEndLocation={(position) => {
                  setSelectedEndLocation((prev) => {
                    if (!prev) return prev;
                    return { ...prev, position };
                  });
                }}
              />
            )}
          </Layer>
        </Stage>
      </div>
      <style jsx>{`
        .konva-stage {
          width: 650px;
          position: relative;
        }
      `}</style>
    </>
  );
};
