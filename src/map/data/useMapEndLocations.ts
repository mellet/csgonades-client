import useSWR from "swr";
import { NadeType } from "../../nade/models/NadeType";
import { CsMap } from "../models/CsGoMap";
import { MapLocationApi } from "./MapLocationApi";
import { useCallback } from "react";
import {
  MapEndLocation,
  MapEndLocationUpdate,
} from "../models/NadeEndLocation";
import { GameMode } from "../../nade/models/GameMode";

async function fetcher(
  _url: string,
  csMap: CsMap,
  nadeType: NadeType,
  gameMode: GameMode
) {
  const result = await MapLocationApi.getMapEndLocation(
    csMap,
    nadeType,
    gameMode
  );
  return result;
}

export const useMapEndLocations = (
  csMap: CsMap,
  nadeType: NadeType,
  gameMode: GameMode
) => {
  const { data, mutate } = useSWR(
    ["mapEndLocation", csMap, nadeType, gameMode],
    fetcher
  );

  const addMapEndLocation = useCallback(async () => {
    await MapLocationApi.addMapEndLocation({
      calloutName: "",
      map: csMap,
      position: { x: 100, y: 100 },
      type: nadeType,
      gameMode: gameMode,
    });
    mutate();
  }, [csMap, mutate, nadeType, gameMode]);

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
      mutate();
    },
    [mutate]
  );

  return {
    mapEndLocations: data || [],
    addMapEndLocation,
    updateMapEndLocation,
    deleteMapEndLocation,
  };
};
