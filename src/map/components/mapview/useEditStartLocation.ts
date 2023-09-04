import { useState } from "react";
import { MapStartLocation } from "../../models/NadeStartLocation";

export const useEditStartLocation = () => {
  const [selectedLocation] = useState<MapStartLocation | null>(null);

  return {
    selectStartLocation: selectedLocation ? selectedLocation.id : null,
  };
};
