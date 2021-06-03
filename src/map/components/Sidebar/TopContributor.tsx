import { FC, useMemo } from "react";
import { UserLight } from "../../../users/models/User";
import { useTheme } from "../../../core/settings/SettingsHooks";
import Link from "next/link";
import { ContListProps } from "./topContributorsProps";
import { Dimensions } from "../../../constants/Constants";
import { Popup } from "semantic-ui-react";

interface UserContribution extends UserLight {
  nadeCount: number;
  totalScore: number;
  score: number;
}

export const TopContributorList: FC<ContListProps> = ({ nades }) => {
  const { colors } = useTheme();
  const contributors = useMemo(() => {
    const contCount: { [key: string]: UserContribution } = {};
    nades.forEach((nade) => {
      const steamId = nade.user.steamId;
      const currentUser = contCount[steamId];

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
    let sortedContributors = Object.values(contCount);
    sortedContributors = sortedContributors.filter(
      (n) => n.steamId !== "76561198026064832"
    );
    sortedContributors = sortedContributors.map((u) => {
      return {
        ...u,
        score: Math.log(u.totalScore / u.nadeCount) + Math.log(u.nadeCount) / 3,
      };
    });
    sortedContributors.sort((a, b) => {
      return b.score - a.score;
    });

    const top = sortedContributors.slice(0, 16);

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
          margin-left: -2px;
          margin-right: -2px;
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
      <Popup
        position="top center"
        content={user.nickname}
        size="mini"
        inverted
        trigger={
          <div className="contributor-wrap">
            <Link href={`/users/${user.steamId}`}>
              <a className="contributor">
                <img src={user.avatar} />
              </a>
            </Link>
          </div>
        }
      />

      <style jsx>{`
        .contributor-wrap {
          display: flex;
        }

        .contributor {
          display: flex;
          margin: 3px;
        }

        .contributor img {
          height: 28px;
          width: 28px;
          border-radius: 50%;
          border: 1px solid ${colors.DARK_BORDER};
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
