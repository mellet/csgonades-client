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

    // Select a ct nade if available
    if (ctNades.length > 0) {
      const nade = ctNades.pop();
      nade && pair.push(nade);
    } else if (bothNades.length > 0) {
      const nade = bothNades.pop();
      nade && pair.push(nade);
    } else if (tNades.length > 0) {
      const nade = tNades.pop();
      nade && pair.push(nade);
    }

    // Select a t nade if available
    if (tNades.length > 0) {
      const nade = tNades.pop();
      nade && pair.push(nade);
    } else if (bothNades.length > 0) {
      const nade = bothNades.pop();
      nade && pair.push(nade);
    } else if (ctNades.length > 0) {
      const nade = ctNades.pop();
      nade && pair.push(nade);
    }

    // Add the pair to the pairings array
    randomizedPairings.push(pair);
  }

  shuffleArray(randomizedPairings);

  console.log("Pairings", randomizedPairings);

  return randomizedPairings;
}

// Helper function to shuffle an array in place
function shuffleArray<T>(array: T[]): void {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    // @ts-ignore
    [array[i], array[j]] = [array[j], array[i]];
  }
}
