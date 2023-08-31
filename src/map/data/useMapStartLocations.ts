import useSWR from "swr";
import { CsMap } from "../models/CsGoMap";
import { MapLocationApi } from "./NadeLocationApi";
import { useCallback } from "react";
import {
  MapStartLocation,
  MapStartLocationCreate,
  MapStartLocationUpdate,
} from "../models/NadeStartLocation";

async function fetcher(_url: string, csMap: CsMap) {
  const result = await MapLocationApi.getMapStartLocation(csMap);
  return result;
}

export const useMapStartLocations = (csMap: CsMap) => {
  const { data, isValidating, mutate } = useSWR(
    ["mapStartLocation", csMap],
    fetcher
  );

  console.log("## Start locations", data);

  const isLoading = !data && isValidating;

  const addMapStartLocation = useCallback(
    async (newMapStartLocation: MapStartLocationCreate) => {
      await MapLocationApi.addMapStartLocation(newMapStartLocation);
      mutate();
    },
    [mutate]
  );

  const updateMapStartLocation = useCallback(
    async (mapStartLocation: MapStartLocationUpdate) => {
      await MapLocationApi.updateNadeLocation(mapStartLocation);
      mutate();
    },
    [mutate]
  );

  const deleteMapStartLocation = useCallback(
    async (location: MapStartLocation) => {
      await MapLocationApi.deleteMapStartLocation(location);
      const updatedLocations = data?.filter((l) => l.id !== location.id);
      mutate(updatedLocations);
    },
    [mutate, data]
  );

  return {
    isLoading,
    mapStartLocations: data || [],
    addMapStartLocation,
    updateMapStartLocation,
    deleteMapStartLocation,
  };
};
