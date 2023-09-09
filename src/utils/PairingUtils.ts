/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { NadeLight } from "../nade/models/NadePartial";

export function createNewPairings(items: NadeLight[]): NadeLight[][] {
  const shuffledItems = [...items]; // Create a shallow copy of the original list
  for (let i = shuffledItems.length - 1; i > 0; i--) {
    // Fisher-Yates shuffle to randomize the list
    const j = Math.floor(Math.random() * (i + 1));
    // @ts-ignore
    [shuffledItems[i], shuffledItems[j]] = [shuffledItems[j], shuffledItems[i]];
  }

  const pairings: NadeLight[][] = [];

  while (shuffledItems.length) {
    const first = shuffledItems.pop();
    const second = shuffledItems.pop();
    if (first && second) {
      pairings.push([first, second]);
    }
  }

  return pairings;
}
