import { useState } from "react";
import { NadeStartLocation } from "../../models/NadeStartLocation";

export const useEditStartLocation = () => {
  const [selectedLocation] = useState<NadeStartLocation | null>(null);

  return {
    selectStartLocation: selectedLocation ? selectedLocation.id : null,
  };
};
