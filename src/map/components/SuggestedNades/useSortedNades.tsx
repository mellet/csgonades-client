import { useState, useMemo } from "react";
import { NadeLight, NadeLightSort } from "../../../nade/models/Nade";

export default function useSortedNades(
  unsortedNades: NadeLight[] | null,
  defaultSort: NadeLightSort = "score"
): [NadeLight[] | null, NadeLightSort, (sortBy: NadeLightSort) => void] {
  const [sortBy, setSortBy] = useState<NadeLightSort>(defaultSort);

  const sortedNades = useMemo(() => {
    if (unsortedNades) {
      if (sortBy === "createdAt") {
        return [...unsortedNades].sort(
          (a, b) =>
            new Date(b[sortBy]).valueOf() - new Date(a[sortBy]).valueOf()
        );
      }
      return [...unsortedNades].sort((a, b) => b[sortBy] - a[sortBy]);
    }
    return null;
  }, [unsortedNades, sortBy]);

  return [sortedNades, sortBy, setSortBy];
}
