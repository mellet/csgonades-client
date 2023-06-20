/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { NadeLight } from "../nade/models/Nade";

export function createPairings(nades: NadeLight[]): NadeLight[][] {
  const updatedNades = [...nades];

  // Remove a random nade if the count is odd
  if (updatedNades.length % 2 !== 0) {
    const randomIndex = Math.floor(Math.random() * updatedNades.length);
    updatedNades.splice(randomIndex, 1);
  }

  // Separate the nades based on teamSide
  const ctNades: NadeLight[] = updatedNades.filter(
    (nade) => nade.teamSide === "counterTerrorist"
  );
  const tNades: NadeLight[] = updatedNades.filter(
    (nade) => nade.teamSide === "terrorist"
  );
  const bothNades: NadeLight[] = updatedNades.filter(
    (nade) => nade.teamSide === "both" || !nade.teamSide
  );

  // Shuffle the arrays to randomize the nades
  shuffleArray(ctNades);
  shuffleArray(tNades);
  shuffleArray(bothNades);

  // Create the pairings array
  const randomizedPairings: NadeLight[][] = [];

  while (ctNades.length > 0 || tNades.length > 0 || bothNades.length > 0) {
    const pair: NadeLight[] = [];

    if (ctNades.length > 0) {
      const ctNade = ctNades.pop();
      if (ctNade) {
        pair.push(ctNade);
        const companion = selectSameIfPossible(
          ctNade,
          ctNades,
          tNades,
          bothNades
        );
        pair.push(companion);
      }
    } else if (tNades.length > 0) {
      const tNade = tNades.pop();
      if (tNade) {
        pair.push(tNade);
        const companion = selectSameIfPossible(
          tNade,
          ctNades,
          tNades,
          bothNades
        );
        pair.push(companion);
      }
    } else if (bothNades.length > 0) {
      const nade = bothNades.pop();
      if (nade) {
        pair.push(nade);
        const companion = selectSameIfPossible(
          nade,
          ctNades,
          tNades,
          bothNades
        );
        pair.push(companion);
      }
    }

    // Add the pair to the pairings array
    randomizedPairings.push(pair);
  }

  shuffleArray(randomizedPairings);

  return randomizedPairings;
}

function selectSameIfPossible(
  selected: NadeLight,
  ctNades: NadeLight[],
  tNades: NadeLight[],
  anyNades: NadeLight[]
) {
  if (selected.teamSide === "counterTerrorist") {
    if (ctNades.length) {
      return ctNades.pop()!;
    } else if (anyNades.length) {
      return anyNades.pop()!;
    } else {
      return tNades.pop()!;
    }
  } else if (selected.teamSide === "terrorist") {
    if (tNades.length) {
      return tNades.pop()!;
    } else if (anyNades.length) {
      return anyNades.pop()!;
    } else {
      return ctNades.pop()!;
    }
  } else {
    if (tNades.length) {
      return tNades.pop()!;
    } else if (anyNades.length) {
      return anyNades.pop()!;
    } else {
      return ctNades.pop()!;
    }
  }
}

// Helper function to shuffle an array in place
export function shuffleArray<T>(array: T[]): void {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    // @ts-ignore
    [array[i], array[j]] = [array[j], array[i]];
  }
}
