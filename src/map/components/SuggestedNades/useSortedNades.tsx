import { useMemo } from "react";
import { NadeLightSort } from "../../../nade/models/NadeLightSort";
import { useFilterBySortingMethod } from "../../logic/useFilterBySortingMethods";
import { useFilterServerSideNades } from "../../logic/useFilteredNades";
import { NadeLight } from "../../../nade/models/NadePartial";

export default function useSortedNades(unsortedNades: NadeLight[]) {
  const { bySortingMethod } = useFilterBySortingMethod();

  const theNades = useFilterServerSideNades(unsortedNades || []);
  const sortedNades = useSortNades(theNades, bySortingMethod);

  if (bySortingMethod !== "score") {
    return sortedNades;
  }

  const newNades = sortedNades.filter((nade) => Boolean(nade.isNew));
  const nonNewNades = sortedNades.filter((nade) => !Boolean(nade.isNew));

  const [topNade, ...rest] = nonNewNades;

  if (topNade) {
    return [topNade, ...newNades, ...rest];
  } else {
    return [...newNades, ...nonNewNades];
  }
}

const useSortNades = (nades: NadeLight[], sortingMethod: NadeLightSort) => {
  return useMemo(() => {
    if (sortingMethod === "createdAt") {
      return [...nades].sort(
        (a, b) =>
          new Date(b[sortingMethod]).valueOf() -
          new Date(a[sortingMethod]).valueOf()
      );
    }
    return [...nades].sort((a, b) => b[sortingMethod] - a[sortingMethod]);
  }, [nades, sortingMethod]);
};
