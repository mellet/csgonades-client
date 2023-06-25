import React, { useCallback } from "react";
import { CsgoMap } from "../../../map/models/CsGoMap";
import { MapCoordinates } from "../../models/MapCoordinates";
import { NadeMovement } from "../../models/NadeMovement";
import { Tickrate } from "../../models/NadeTickrate";
import { NadeType } from "../../models/NadeType";
import { NadeStatus } from "../../models/Status";
import { TeamSide } from "../../models/TeamSide";
import { Technique } from "../../models/Technique";
import { NadeEditAction } from "./NadeEditActions";
import { GameMode } from "../../models/GameMode";

export type EditNadeCallbacks = ReturnType<typeof useEditNadeActions>;

export const useEditNadeActions = (
  dispatch: React.Dispatch<NadeEditAction>
) => {
  const onSetDescription = useCallback(
    (description: string) => {
      dispatch({ type: "EditNade/SetDescription", description });
    },
    [dispatch]
  );

  const onSetMap = useCallback(
    (map: CsgoMap) => {
      dispatch({ type: "EditNade/SetMap", map });
    },
    [dispatch]
  );

  const onSetYouTubeId = useCallback(
    (youTubeId: string) => {
      dispatch({ type: "EditNade/SetYouTubeId", youTubeId });
    },
    [dispatch]
  );

  const onSetEndPosition = useCallback(
    (endPosition: string) => {
      dispatch({ type: "EditNade/SetEndPosition", endPosition });
    },
    [dispatch]
  );

  const onSetStartPosition = useCallback(
    (startPosition: string) => {
      dispatch({ type: "EditNade/SetStartPosition", startPosition });
    },
    [dispatch]
  );

  const onSetTeleportPosition = useCallback(
    (setPos: string) => {
      dispatch({ type: "EditNade/SetSetPosition", setPos });
    },
    [dispatch]
  );

  const onSetTeamSide = useCallback(
    (side: TeamSide) => {
      dispatch({ type: "EditNade/SetTeamSide", side });
    },
    [dispatch]
  );

  const onSetNadeType = useCallback(
    (nadeType: NadeType) => {
      dispatch({ type: "EditNade/SetNadeType", nadeType });
    },
    [dispatch]
  );

  const onSetMovement = useCallback(
    (movement: NadeMovement) => {
      dispatch({ type: "EditNade/SetMovement", movement });
    },
    [dispatch]
  );

  const onSetTickrate = useCallback(
    (tick: Tickrate) => {
      dispatch({ type: "EditNade/SetTickrate", tick });
    },
    [dispatch]
  );

  const onSetTechnique = useCallback(
    (technique: Technique) => {
      dispatch({ type: "EditNade/SetTechnique", technique });
    },
    [dispatch]
  );

  const onSetOneWay = useCallback(
    (oneWay: boolean) => {
      dispatch({ type: "EditNade/SetOneWay", oneWay });
    },
    [dispatch]
  );

  const onSetProUrl = useCallback(
    (proUrl: string) => {
      dispatch({ type: "EditNade/SetProUrl", proUrl });
    },
    [dispatch]
  );

  const onSetNadeStatus = useCallback(
    (status: NadeStatus) => {
      dispatch({ type: "EditNade/SetNadeStatus", status });
    },
    [dispatch]
  );

  const onSetIsPro = useCallback(() => {
    dispatch({ type: "EditNade/SetIsPro" });
  }, [dispatch]);

  const onUnSetIsPro = useCallback(() => {
    dispatch({ type: "EditNade/UnSetIsPro" });
  }, [dispatch]);

  const onSetImage = useCallback(
    (image: string) => {
      dispatch({ type: "EditNade/SetImage", image });
    },
    [dispatch]
  );

  const onSetCoords = useCallback(
    (mapStartCoord: MapCoordinates, mapEndCoord: MapCoordinates) => {
      dispatch({
        type: "EditNade/SetEndPosCoords",
        data: {
          mapEndCoord,
          mapStartCoord,
        },
      });
    },
    [dispatch]
  );

  const onSetLineUpImage = useCallback(
    (image: string) => {
      dispatch({ type: "EditNade/SetLineUpImage", image });
    },
    [dispatch]
  );

  const onSetGameMode = useCallback(
    (gameMode: GameMode) => {
      dispatch({ type: "EditNade/SetGameMode", gameMode });
    },
    [dispatch]
  );

  return {
    onSetDescription,
    onSetCoords,
    onSetEndPosition,
    onSetGameMode,
    onSetImage,
    onSetIsPro,
    onSetLineUpImage,
    onSetMap,
    onSetMovement,
    onSetNadeStatus,
    onSetNadeType,
    onSetOneWay,
    onSetProUrl,
    onSetStartPosition,
    onSetTeamSide,
    onSetTechnique,
    onSetTeleportPosition,
    onSetTickrate,
    onSetYouTubeId,
    onUnSetIsPro,
  };
};
