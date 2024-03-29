import React, { createContext, FC, useMemo, useReducer } from "react";
import { Nade } from "../../models/Nade";
import { EditNadeCallbacks, useEditNadeActions } from "./useEditNadeActions";
import { nadeEditReducer } from "./EditNadeReducer";
import { EditNadeState } from "./NadeEditState";

type EditNadeProviderContext = {
  nadeUpdates: EditNadeState;
  actions: EditNadeCallbacks;
};

export const EditNadeContextCreator =
  createContext<EditNadeProviderContext | null>(null);

type EditNadeProviderProps = {
  nade: Nade;
};

export const EditNadeProvider: FC<EditNadeProviderProps> = ({
  children,
  nade,
}) => {
  const [state, dispatch] = useReducer(nadeEditReducer, {
    description: nade.description,
    endPosition: nade.endPosition,
    gameMode: nade.gameMode,
    imageBase64: nade.images.result.large,
    isPro: nade.isPro,
    lineUpImageBase64: nade.images.lineup.large,
    map: nade.map,
    mapEndLocationId: nade.mapEndLocationId,
    mapStartLocationId: nade.mapStartLocationId,
    movement: nade.movement,
    oneWay: nade.oneWay,
    proUrl: nade.proUrl,
    setPos: nade.setPos,
    slug: nade.slug,
    startPosition: nade.startPosition,
    status: nade.status,
    teamSide: nade.teamSide,
    technique: nade.technique,
    tickrate: nade.tickrate,
    type: nade.type,
    youTubeId: nade.youTubeId,
  });
  const actions = useEditNadeActions(dispatch);

  const createNadeInternalState = useMemo<EditNadeProviderContext>(() => {
    return {
      actions: actions,
      nadeUpdates: state,
    };
  }, [state, actions]);

  return (
    <EditNadeContextCreator.Provider value={createNadeInternalState}>
      {children}
    </EditNadeContextCreator.Provider>
  );
};
