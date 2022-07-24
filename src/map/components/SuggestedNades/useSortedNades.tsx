import { useMemo } from "react";
import { NadeLight } from "../../../nade/models/Nade";
import { useFilterBySortingMethod } from "../../logic/useFilterBySortingMethods";

export default function useSortedNades(unsortedNades: NadeLight[] | null) {
  const { bySortingMethod } = useFilterBySortingMethod();

  const artificialBoost = useMemo(() => {
    if (unsortedNades && unsortedNades.length > 6) {
      const lastIndex = unsortedNades.length - 1;
      const randomIndexToBoost = randomIntFromInterval(3, lastIndex);
      console.log("Random index to boost", randomIndexToBoost, lastIndex);

      const allScores = unsortedNades.map((nade) => nade.score);
      const boostScore = secondMax(allScores) - 1;

      return unsortedNades.map((nade, idx) => {
        if (idx === randomIndexToBoost) {
          return {
            ...nade,
            score: boostScore,
          };
        }

        return nade;
      });
    }
    return unsortedNades;
  }, [unsortedNades]);

  const sortedNades = useMemo(() => {
    if (artificialBoost) {
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
    }
    return null;
  }, [artificialBoost, bySortingMethod]);

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
