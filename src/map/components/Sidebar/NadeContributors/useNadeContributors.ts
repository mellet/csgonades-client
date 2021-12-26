import { useMemo } from "react";
import { NadeLight } from "../../../../nade/models/Nade";
import { UserContributor } from "./UserContributor";

export const useNadeContributors = (nades: NadeLight[], num: number) => {
  const contributors = useMemo(
    () =>
      createContributorsList(nades)
        .map(calculateScore)
        .sort(sortHighestContribution)
        .slice(0, num),
    [nades, num]
  );

  return contributors;
};

function createContributorsList(nades: NadeLight[]) {
  const contCount: { [key: string]: UserContributor } = {};

  nades.forEach((nade) => {
    const steamId = nade.user.steamId;
    const currentUser = contCount[steamId];

    // Skip very new nades as they have a artificially high score
    if (nade.viewCount < 1000) {
      return;
    }

    if (currentUser) {
      contCount[steamId] = {
        ...currentUser,
        nadeCount: currentUser.nadeCount + 1,
        totalScore: currentUser.totalScore + nade.score,
      };
    } else {
      contCount[steamId] = {
        ...nade.user,
        nadeCount: 1,
        score: 0,
        totalScore: nade.score,
      };
    }
  });

  return Object.values(contCount);
}

function calculateScore(userContribution: UserContributor): UserContributor {
  return {
    ...userContribution,
    score:
      Math.log(userContribution.totalScore / userContribution.nadeCount) +
      Math.log(userContribution.nadeCount) / 3,
  };
}

function sortHighestContribution(
  userContributionA: UserContributor,
  userContributionB: UserContributor
) {
  return userContributionB.score - userContributionA.score;
}
