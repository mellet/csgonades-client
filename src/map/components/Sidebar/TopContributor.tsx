import { FC, useMemo } from "react";
import { UserLight } from "../../../users/models/User";
import { useTheme } from "../../../core/settings/SettingsHooks";
import Link from "next/link";
import { mapString } from "../../models/CsGoMap";
import { ContListProps } from "./topContributorsProps";

interface UserContribution extends UserLight {
  bestScore: number;
  nadeCount: number;
  score: number;
  totalScore: number;
}

export const TopContributorList: FC<ContListProps> = ({ nades, csMap }) => {
  const { colors } = useTheme();
  const contributors = useMemo(() => {
    const contCount: { [key: string]: UserContribution } = {};
    nades.forEach((nade) => {
      const steamId = nade.user.steamId;
      const currentUser = contCount[steamId];
      if (currentUser) {
        contCount[steamId] = {
          ...currentUser,
          nadeCount: currentUser.nadeCount + 1,
          bestScore: Math.max(currentUser.bestScore, nade.favoriteCount),
          totalScore: currentUser.totalScore + nade.favoriteCount,
        };
      } else {
        contCount[steamId] = {
          ...nade.user,
          nadeCount: 1,
          bestScore: nade.favoriteCount,
          score: 0,
          totalScore: nade.favoriteCount,
        };
      }
    });
    let sortedContributors = Object.values(contCount);
    sortedContributors = sortedContributors.filter(
      (n) => n.steamId !== "76561198026064832"
    );
    sortedContributors = sortedContributors.map((u) => {
      return {
        ...u,
        score: u.bestScore + u.nadeCount,
      };
    });
    sortedContributors.sort((a, b) => {
      const aScore =
        Math.log(a.totalScore || 2) + Math.log(a.nadeCount || 2) / 4;
      const bScore =
        Math.log(b.totalScore || 2) + Math.log(b.nadeCount || 2) / 4;
      return bScore - aScore;
    });

    const top10 = sortedContributors.slice(0, 10);

    return top10;
  }, [nades]);

  return (
    <>
      <div className="cont-list">
        <div className="label">{mapString(csMap)} Contributors</div>
        <div className="contributors">
          {contributors.map((c) => (
            <TopContributor key={c.steamId} user={c} />
          ))}
        </div>
      </div>
      <style jsx>{`
        .cont-list {
          background: ${colors.DP02};
          overflow: hidden;
          border: 1px solid ${colors.BORDER};
          border-radius: 8px;
        }

        .label {
          background: ${colors.DP01};
          border-bottom: 1px solid ${colors.BORDER};
          color: ${colors.TEXT};
          padding: 10px 16px;
          text-align: center;
          font-size: 18px;
        }

        .contributors {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: center;
          padding-top: 6px;
          padding-bottom: 6px;
        }

        .gold,
        .silver,
        .bronze,
        .split {
          display: flex;
          align-items: center;
          padding: 8px 16px;
        }

        .cont-list span {
          font-size: 1.2em;
          margin-right: 8px;
          display: block;
          position: relative;
          top: 1px;
        }

        #gold {
          grid-area: gold;
        }
        #silver {
          grid-area: silver;
        }
        #bronze {
          grid-area: bronze;
        }

        #gold-ped {
          grid-area: gold-ped;
        }

        #silver-ped {
          grid-area: silver-ped;
        }

        #bronze-ped {
          grid-area: bronze-ped;
        }

        #mid {
          grid-area: mid;
        }
      `}</style>
    </>
  );
};

type Props = {
  user: UserContribution;
};

const TopContributor: FC<Props> = ({ user }) => {
  const { colors } = useTheme();
  return (
    <>
      <div className="contributor-wrap">
        <Link href={`/users/${user.steamId}`}>
          <a className="contributor">
            <img src={user.avatar} />
          </a>
        </Link>
      </div>

      <style jsx>{`
        .contributor-wrap {
          display: flex;
        }

        .contributor {
          display: flex;
          margin: 10px;
        }

        .contributor img {
          height: 30px;
          width: 30px;
          border-radius: 50%;
          border: 1px solid ${colors.BORDER};
        }

        .nickname {
          display: block;
          padding-left: 5px;
          padding-right: 15px;
          font-size: 12px;
          white-space: nowrap;
        }
      `}</style>
    </>
  );
};
