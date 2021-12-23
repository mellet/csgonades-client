import { useMemo } from "react";
import { NadeLight } from "../../../nade/models/Nade";
import { useFilterBySortingMethod } from "../../logic/useFilterBySortingMethods";

export default function useSortedNades(unsortedNades: NadeLight[] | null) {
  const { bySortingMethod } = useFilterBySortingMethod();

  const sortedNades = useMemo(() => {
    if (unsortedNades) {
      if (bySortingMethod === "createdAt") {
        return [...unsortedNades].sort(
          (a, b) =>
            new Date(b[bySortingMethod]).valueOf() -
            new Date(a[bySortingMethod]).valueOf()
        );
      }
      return [...unsortedNades].sort(
        (a, b) => b[bySortingMethod] - a[bySortingMethod]
      );
    }
    return null;
  }, [unsortedNades, bySortingMethod]);

  return sortedNades;
}
