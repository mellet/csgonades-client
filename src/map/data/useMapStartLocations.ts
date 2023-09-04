import useSWR from "swr";
import { CsMap } from "../models/CsGoMap";
import { MapLocationApi } from "./MapLocationApi";
import { useCallback } from "react";
import {
  MapStartLocation,
  MapStartLocationCreate,
  MapStartLocationUpdate,
} from "../models/NadeStartLocation";
import { GameMode } from "../../nade/models/GameMode";

async function fetcher(_url: string, csMap: CsMap, gameMode: GameMode) {
  const result = await MapLocationApi.getMapStartLocation(csMap, gameMode);
  return result;
}

export const useMapStartLocations = (csMap: CsMap, gameMode: GameMode) => {
  const { data, isValidating, mutate } = useSWR(
    ["mapStartLocation", csMap, gameMode],
    fetcher
  );

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
