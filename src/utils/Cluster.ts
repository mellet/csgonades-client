import { MapCoordinates, NadeLight } from "../nade-data/Nade/Nade";

export function custerNades(nades: NadeLight[]) {
  const maxDistance = 30;
  const clusters: NadeLight[][] = [];

  for (const nade of nades) {
    if (!nade.mapEndCoord) {
      continue;
    }
    // For the first nade, just push it
    if (clusters.length === 0) {
      clusters.push([nade]);
    } else {
      let addedToCluster = false;

      // See if we find a cluster where the nade fits
      for (const cluster of clusters) {
        const firstNade = cluster[0];
        const dist = distanceBetween(nade.mapEndCoord!, firstNade.mapEndCoord!);
        if (dist < maxDistance) {
          cluster.push(nade);
          addedToCluster = true;
          break;
        }
      }

      if (!addedToCluster) {
        clusters.push([nade]);
      }
    }
  }

  return clusters;
}

function distanceBetween(coordA: MapCoordinates, coordB: MapCoordinates) {
  const dist = Math.sqrt(
    Math.pow(coordA.x - coordB.x, 2) + Math.pow(coordA.y - coordB.y, 2)
  );
  return dist;
}
