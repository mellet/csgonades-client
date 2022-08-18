import { useMemo } from "react";
import { NadeLight } from "../../../nade/models/Nade";
import { isNewNade } from "../../../utils/Common";
import { useFilterBySortingMethod } from "../../logic/useFilterBySortingMethods";
import { useFilterServerSideNades } from "../../logic/useFilteredNades";

export default function useSortedNades(unsortedNades: NadeLight[]) {
  const { bySortingMethod } = useFilterBySortingMethod();

  const theNades = useFilterServerSideNades(unsortedNades || []);

  const artificialBoost = useMemo(() => {
    if (theNades && theNades.length >= 6) {
      const canditateBoosts = theNades.filter((nade) => {
        return nade.favoriteCount <= 10;
      });

      if (canditateBoosts.length < 2) {
        return theNades;
      }

      const noneCandidates = theNades.filter((nade) => nade.favoriteCount > 10);

      const randomIndexToBoost = randomIntFromInterval(
        0,
        canditateBoosts.length - 1
      );

      const allScores = theNades.map((nade) => nade.score);
      const boostScore = secondMax(allScores) - 1;

      const boostedCandidates = canditateBoosts.map((nade, idx) => {
        if (idx === randomIndexToBoost) {
          return {
            ...nade,
            score: boostScore,
          };
        }

        return nade;
      });

      return [...noneCandidates, ...boostedCandidates];
    }
    return theNades;
  }, [theNades]);

  const sortedNades = useMemo(() => {
    if (bySortingMethod === "createdAt") {
      return [...artificialBoost].sort(
        (a, b) =>
          new Date(b[bySortingMethod]).valueOf() -
          new Date(a[bySortingMethod]).valueOf()
      );
    }
    return [...artificialBoost].sort(
      (a, b) => b[bySortingMethod] - a[bySortingMethod]
    );
  }, [artificialBoost, bySortingMethod]);

  const topNonNew = sortedNades.filter((n) => !isNewNade(n.createdAt))[0];

  if (topNonNew) {
    return [topNonNew, ...sortedNades.filter((n) => n.id !== topNonNew.id)];
  }

  return sortedNades;
}

function randomIntFromInterval(min: number, max: number) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function secondMax(arr: number[]): number {
  const max = Math.max.apply(null, arr), // get the max of the array
    maxi = arr.indexOf(max);
  arr[maxi] = -Infinity; // replace max in the array with -infinity
  const secondMax = Math.max.apply(null, arr); // get the new max
  arr[maxi] = max;
  return secondMax;
}
