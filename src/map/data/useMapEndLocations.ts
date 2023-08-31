import useSWR from "swr";
import { NadeType } from "../../nade/models/NadeType";
import { CsMap } from "../models/CsGoMap";
import { MapLocationApi } from "./NadeLocationApi";
import { useCallback } from "react";
import {
  MapEndLocation,
  MapEndLocationUpdate,
} from "../models/NadeEndLocation";

async function fetcher(_url: string, csMap: CsMap, nadeType: NadeType) {
  const result = await MapLocationApi.getMapEndLocation(csMap, nadeType);
  return result;
}

export const useMapEndLocations = (csMap: CsMap, nadeType: NadeType) => {
  const { data, mutate } = useSWR(["mapEndLocation", csMap, nadeType], fetcher);

  const addMapEndLocation = useCallback(async () => {
    await MapLocationApi.addMapEndLocation({
      calloutName: "",
      map: csMap,
      position: { x: 100, y: 100 },
      type: nadeType,
    });
    mutate();
  }, [csMap, mutate, nadeType]);

  const updateMapEndLocation = useCallback(
    async (location: MapEndLocationUpdate) => {
      await MapLocationApi.updateMapEndLocation(location);
      mutate();
    },
    [mutate]
  );

  const deleteMapEndLocation = useCallback(
    async (location: MapEndLocation) => {
      await MapLocationApi.deleteMapEndLocation(location);
      mutate(
        data?.filter((l) => l.id !== location.id),
        { revalidate: true }
      );
    },
    [data, mutate]
  );

  return {
    mapEndLocations: data || [],
    addMapEndLocation,
    updateMapEndLocation,
    deleteMapEndLocation,
  };
};
