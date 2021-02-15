import { FC, useMemo } from "react";
import { UserLight } from "../../../users/models/User";
import { useTheme } from "../../../core/settings/SettingsHooks";
import Link from "next/link";
import { ContListProps } from "./topContributorsProps";
import { Dimensions } from "../../../constants/Constants";

interface UserContribution extends UserLight {
  bestScore: number;
  nadeCount: number;
  score: number;
  totalScore: number;
}

export const TopContributorList: FC<ContListProps> = ({ nades }) => {
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

    const top = sortedContributors.slice(0, 12);

    return top;
  }, [nades]);

  return (
    <>
      <div className="cont-list">
        <div className="label">Nade Contributors</div>
        <div className="contributors">
          {contributors.map((c) => (
            <TopContributor key={c.steamId} user={c} />
          ))}
        </div>
      </div>
      <style jsx>{`
        .cont-list {
          margin-top: ${Dimensions.GUTTER_SIZE}px;
          border-top: 1px solid ${colors.BORDER};
        }

        .label {
          color: ${colors.TEXT};
          padding: 16px 16px;
          padding-bottom: 8px;
          text-align: center;
          font-size: 16px;
        }

        .contributors {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: space-between;
          margin-left: -8px;
          margin-right: -8px;
        }

        .cont-list span {
          font-size: 1.2em;
          margin-right: 8px;
          display: block;
          position: relative;
          top: 1px;
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
          margin: 8px;
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
