import { NadeLight } from "../../nade/models/NadePartial";

export const checkShouldShowBattleRoyalButton = (
  nadeClusters: NadeLight[][]
) => {
  const minPairs = 2;
  let possibleParis = 0;

  for (const cluster of nadeClusters) {
    if (cluster.length < 2) {
      continue;
    }
    possibleParis += Math.floor(cluster.length / 2);
  }

  return possibleParis >= minPairs;
};
