import { NadeCreateBody } from "../nade/models/Nade";

export const isValidNewNade = (
  state: Partial<NadeCreateBody>
): NadeCreateBody | false => {
  const {
    description,
    endPosition,
    gfycat,
    imageBase64,
    lineUpImageBase64,
    map,
    mapEndCoord,
    movement,
    oneWay,
    startPosition,
    technique,
    tickrate,
    type,
    teamSide,
    setPos,
  } = state;
  if (
    !description ||
    !endPosition ||
    !gfycat ||
    !imageBase64 ||
    !lineUpImageBase64 ||
    !map ||
    !mapEndCoord ||
    !movement ||
    !startPosition ||
    !technique ||
    !type
  ) {
    return false;
  }

  return {
    map,
    description,
    endPosition,
    gfycat,
    imageBase64,
    mapEndCoord,
    movement,
    startPosition,
    technique,
    type,
    tickrate,
    lineUpImageBase64,
    oneWay,
    teamSide,
    setPos: setPosStringFix(setPos),
  };
};

function setPosStringFix(setPos?: string) {
  if (setPos && setPos.length > 0) {
    return setPos;
  }
  return undefined;
}
