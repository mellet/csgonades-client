import { FC, useRef } from "react";
import { MapNadeLocations } from "../../models/MapNadeLocations";
import { NadeType } from "../../../nade/models/NadeType";
import { CsMap } from "../../models/CsGoMap";
import { NadeImage } from "./NadeImage";
import { Group } from "react-konva";
import Konva from "konva";

type Props = {
  csMap: CsMap;
  mapNadeLocations: MapNadeLocations[];
  onNadeClick: (mapLocation: MapNadeLocations) => void;
  onUnselect: () => void;
  selectedLocationId?: string;
};

export const GrenadeView: FC<Props> = ({
  csMap,
  mapNadeLocations,
  onNadeClick,
  selectedLocationId,
}) => {
  const groupRef = useRef<Konva.Group>(null);
  const selectedLocation = mapNadeLocations.find(
    (mNL) => mNL.endLocation.id === selectedLocationId
  );

  return (
    <>
      <Group ref={groupRef} visible={!selectedLocation}>
        {mapNadeLocations.map((loc) => {
          return (
            <NadeImage
              key={loc.endLocation.id}
              count={loc.endLocation.count}
              csMap={csMap}
              hasNew={loc.endLocation.hasNew}
              nadeType={loc.endLocation.type}
              onNadeClick={() => {
                onNadeClick(loc);
              }}
              x={loc.endLocation.position.x}
              y={loc.endLocation.position.y}
            />
          );
        })}
      </Group>
    </>
  );
};

export type MapImageProps = {
  csMap: CsMap;
  nadeType: NadeType;
  x: number;
  y: number;
  onNadeClick: () => void;
  onUnselect: () => void;
  hide?: boolean;
  isSelected?: boolean;
  count: number;
  hasNew?: boolean;
};
