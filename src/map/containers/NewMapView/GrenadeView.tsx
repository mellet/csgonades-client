import { FC } from "react";
import { MapNadeLocations } from "../../models/MapNadeLocations";
import { NadeType } from "../../../nade/models/NadeType";
import { CsMap } from "../../models/CsGoMap";
import { NadeImage } from "./NadeImage";

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
  onUnselect,
  selectedLocationId,
}) => {
  return (
    <>
      {mapNadeLocations.map((loc) => (
        <NadeImage
          hasNew={loc.endLocation.hasNew}
          csMap={csMap}
          count={loc.endLocation.count}
          hide={
            selectedLocationId
              ? selectedLocationId !== loc.endLocation.id
              : false
          }
          key={loc.endLocation.id}
          nadeType={loc.endLocation.type}
          x={loc.endLocation.position.x}
          y={loc.endLocation.position.y}
          onNadeClick={() => onNadeClick(loc)}
          onUnselect={onUnselect}
          isSelected={loc.endLocation.id === selectedLocationId}
        />
      ))}
      <style jsx>{``}</style>
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

export function nadeScale(csMap: CsMap): { x: number; y: number } {
  if (csMap === "mirage" || csMap === "inferno") {
    return { x: 0.9, y: 0.9 };
  }
  if (csMap === "nuke") {
    return { x: 0.8, y: 0.8 };
  }
  return { x: 1, y: 1 };
}
