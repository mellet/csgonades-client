/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { NadeLight } from "../nade/models/NadeLight";

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

export function shuffleArrays<T>(arr: T[]): T[] {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    // @ts-ignore

    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export const cleanAndSortNadeClusters = (nadeCluster: NadeLight[][]) => {
  const onlyClustersWithTwoNadesOrMore = [...nadeCluster].filter(
    (nadeList) => nadeList.length >= 2
  );
  const onlyEven = makeEven(onlyClustersWithTwoNadesOrMore);
  const shuffled = shuffleArrays(onlyEven);

  return shuffled;
};

function makeEven(arr: NadeLight[][]): NadeLight[][] {
  const result: NadeLight[][] = [];

  for (const subarray of arr) {
    if (subarray.length % 2 === 1) {
      subarray.pop();
    }
    result.push(subarray);
  }

  return result;
}

export function selectElements(arr: any[][], count: number): any[][] {
  const result: any[][] = [];
  let totalCount = 0;

  for (const subarray of arr) {
    const subArrayCopy = [...subarray];
    shuffleArray(subArrayCopy);
    const remainingCount = Math.min(count - totalCount, 8);
    const selectedElements = subArrayCopy.slice(0, remainingCount);
    result.push(selectedElements);
    totalCount += selectedElements.length;

    if (totalCount >= count) {
      break;
    }
  }

  return result;
}

type ExtractedNadePair = {
  newNadePairing: NadeLight[];
  clusters: NadeLight[][];
};

export function extractNewNadePair(clusters: NadeLight[][]): ExtractedNadePair {
  const clustersCopy = clusters.map((cluster) => [...cluster]);
  shuffleArray(clustersCopy);
  let newNadePairing: NadeLight[] = [];
  let selectedClusterIndex = -1;

  for (let i = 0; i < clustersCopy.length; i++) {
    const cluster = clustersCopy[i];
    if (!cluster) continue; // Skip if cluster is undefined

    const newNades = cluster.filter((nade) => nade.isNew);

    if (newNades.length > 0 && cluster.length >= 2) {
      const randomNewNadeIndex = getRandomIndex(newNades.length);
      const newNade = newNades[randomNewNadeIndex];

      const remainingNades = cluster.filter((nade) => nade.id !== newNade?.id);
      const randomNadeIndex = getRandomIndex(remainingNades.length);
      const randomNade = remainingNades[randomNadeIndex];

      if (newNade && randomNade) {
        newNadePairing = [newNade, randomNade];
        selectedClusterIndex = i;
        break;
      }
    }
  }

  if (selectedClusterIndex === -1) {
    return {
      newNadePairing: [],
      clusters: clustersCopy,
    };
  }

  const clusterWithNewNade = clustersCopy[selectedClusterIndex];
  const newNade = newNadePairing[0];
  const randomNade = newNadePairing[1];

  // Remove the selected nades from the clusters copy if it is defined
  if (clusterWithNewNade && newNade && randomNade) {
    clustersCopy[selectedClusterIndex] = clusterWithNewNade.filter(
      (nade) => nade.id !== newNade.id && nade.id !== randomNade.id
    );
  }

  return {
    newNadePairing,
    clusters: clustersCopy,
  };
}

function getRandomIndex(length: number): number {
  return Math.floor(Math.random() * length);
}
