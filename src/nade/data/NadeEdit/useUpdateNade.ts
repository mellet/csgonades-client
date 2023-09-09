import { useRouter } from "next/router";
import { useCallback, useMemo, useState } from "react";
import { useSignedInUser } from "../../../core/authentication/useSignedInUser";
import { useDisplayToast } from "../../../core/toasts/hooks/useDisplayToast";
import { Nade } from "../../models/Nade";
import { NadeUpdateBody } from "../../models/NadeUpdateBody";
import { NadeApi } from "../NadeApi";

export const useUpdateNade = (nade: Nade, updateNadeBody: NadeUpdateBody) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const displayToast = useDisplayToast();
  const { signedInUser } = useSignedInUser();

  const isUpdateNadeEnabled = useMemo(() => {
    const updateDto = createNadeUpdateBody(nade, updateNadeBody);

    const changedFields = Object.keys(updateDto).length;

    return changedFields !== 0;
  }, [updateNadeBody, nade]);

  const onUpdateNade = useCallback(async () => {
    setIsLoading(true);
    const updateDto = createNadeUpdateBody(nade, updateNadeBody);
    const changedFields = Object.keys(updateDto).length;

    if (!changedFields) {
      displayToast({
        severity: "info",
        title: "Nothing Changed",
        message: "Nothing changed from original nade",
      });
      return setIsLoading(false);
    }

    if (!signedInUser) {
      displayToast({
        severity: "error",
        title: "Not Signed In",
        message: "You don't seem to be signed in.",
      });
      return setIsLoading(false);
    }

    const result = await NadeApi.update(nade.id, updateDto);

    if (result.isErr()) {
      displayToast({
        severity: "error",
        message: "Failed to update nade",
      });
      return setIsLoading(false);
    }

    displayToast({
      severity: "success",
      message:
        "Nade updated! It can take up to 30 minutes for the change to be seen other places on the site.",
    });

    router.push("/nades/[nade]", `/nades/${nade.slug || nade.id}`);
  }, [displayToast, nade, router, signedInUser, updateNadeBody]);

  return {
    isUpdateNadeEnabled,
    onUpdateNade,
    isLoading,
  };
};

function createNadeUpdateBody(
  nade: Nade,
  update: NadeUpdateBody
): NadeUpdateBody {
  const description = newValueIfDifferent(nade.description, update.description);
  const endPosition = newValueIfDifferent(nade.endPosition, update.endPosition);
  const imageBase64 = newValueIfDifferent(
    nade.images.result.large,
    update.imageBase64
  );
  const map = newValueIfDifferent(nade.map, update.map);
  const movement = newValueIfDifferent(nade.movement, update.movement);
  const startPosition = newValueIfDifferent(
    nade.startPosition,
    update.startPosition
  );
  const status = newValueIfDifferent(nade.status, update.status);
  const technique = newValueIfDifferent(nade.technique, update.technique);
  const tickrate = newValueIfDifferent(nade.tickrate, update.tickrate);
  const type = newValueIfDifferent(nade.type, update.type);
  const oneWay = newBooleanValueIfDifferent(nade.oneWay, update.oneWay);
  const lineUpImageBase64 = newValueIfDifferent(
    nade.images.lineup.large,
    update.lineUpImageBase64
  );
  const isPro = newBooleanValueIfDifferent(nade.isPro, update.isPro);
  const teamSide = newValueIfDifferent(nade.teamSide, update.teamSide);
  const setPos = newValueIfDifferent(nade.setPos, update.setPos);
  const proUrl = newValueIfDifferent(nade.proUrl, update.proUrl);
  const youTubeId = newValueIfDifferent(nade.youTubeId, update.youTubeId);
  const gameMode = newValueIfDifferent(nade.gameMode, update.gameMode);
  const mapEndLocationId = newValueIfDifferent(
    nade.mapEndLocationId,
    update.mapEndLocationId
  );
  const mapStartLocationId = newValueIfDifferent(
    nade.mapStartLocationId,
    update.mapStartLocationId
  );

  const updateBody: NadeUpdateBody = {
    description,
    endPosition,
    gameMode,
    imageBase64,
    isPro,
    lineUpImageBase64,
    map,
    movement,
    oneWay,
    proUrl,
    setPos,
    startPosition,
    status,
    teamSide,
    technique,
    tickrate,
    type,
    youTubeId,
    mapEndLocationId,
    mapStartLocationId,
  };

  // Remove undefine keys
  Object.keys(updateBody).forEach((key) =>
    updateBody[key] === undefined ? delete updateBody[key] : {}
  );

  return updateBody;
}

function newValueIfDifferent<T>(
  originalValue?: T,
  newValue?: T
): T | undefined {
  const originalValueCheck = JSON.stringify(originalValue);
  const newValueCheck = JSON.stringify(newValue);

  if (newValue === "") {
    return newValue;
  }

  if (!newValue) {
    return undefined;
  } else if (originalValueCheck === newValueCheck) {
    return undefined;
  } else {
    return newValue;
  }
}

function newBooleanValueIfDifferent(
  originalValue?: boolean,
  newValue?: boolean
): boolean | undefined {
  if (typeof newValue === "boolean" && originalValue !== newValue) {
    return newValue;
  }
  return undefined;
}
