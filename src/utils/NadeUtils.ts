import { NadeCreateBody } from "../nade/models/Nade";

export const isValidNewNade = (
  state: Partial<NadeCreateBody>
): NadeCreateBody | false => {
  const {
    description,
    endPosition,
    gameMode,
    gfycat,
    imageBase64,
    lineUpImageBase64,
    map,
    mapEndCoord,
    mapStartCoord,
    movement,
    oneWay,
    setPos,
    startPosition,
    teamSide,
    technique,
    tickrate,
    type,
  } = state;
  if (
    !description ||
    !endPosition ||
    !gameMode ||
    !gfycat ||
    !imageBase64 ||
    !lineUpImageBase64 ||
    !map ||
    !mapEndCoord ||
    !mapStartCoord ||
    !movement ||
    !startPosition ||
    !technique ||
    !type
  ) {
    return false;
  }

  return {
    description,
    endPosition,
    gameMode,
    gfycat,
    imageBase64,
    lineUpImageBase64,
    map,
    mapEndCoord,
    mapStartCoord,
    movement,
    oneWay,
    setPos: setPosStringFix(setPos),
    startPosition,
    teamSide,
    technique,
    tickrate,
    type,
  };
};

function setPosStringFix(setPos?: string) {
  if (setPos && setPos.length > 0) {
    return setPos;
  }
  return undefined;
}
