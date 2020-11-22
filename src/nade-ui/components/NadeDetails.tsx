import { FC } from "react";
import { Dimensions } from "../../constants/Constants";
import { Nade } from "../../nade-data/Nade/Nade";
import { useTheme } from "../../store/SettingsStore/SettingsHooks";
import { prettyDate } from "../../utils/DateUtils";
import { PageLink } from "../../common/PageLink";
import { pluralize } from "../../utils/Common";

type Props = {
  nade: Nade;
};

export const NadeDetails: FC<Props> = ({ nade }) => {
  const { colors } = useTheme();
  return (
    <>
      <div className="nade-details">
        <div className="nade-user">
          <img src={nade.user.avatar} />{" "}
          <PageLink href={`/users/[user]`} as={`/users/${nade.user.steamId}`}>
            <span className="user-nickname">{nade.user.nickname}</span>
          </PageLink>
        </div>

        <div className="nade-stats">
          <span>
            {pluralize(nade.favoriteCount, "favorite")} |{" "}
            {pluralize(nade.commentCount, "comment")} |{" "}
            {prettyDate(nade.createdAt)}
          </span>
        </div>
      </div>
      <style jsx>{`
        .nade-details {
          background: ${colors.boxTitleBg};
          border-top-left-radius: 5px;
          border-top-right-radius: 5px;
          padding: 15px 30px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .nade-stats {
          font-size: 14px;
          color: #a0a0a0;
        }

        .nade-user {
          display: flex;
          align-items: center;
          color: ${colors.TEXT};
        }

        .user-nickname {
          color: ${colors.TEXT};
        }

        .user-nickname:hover {
          text-decoration: underline;
        }

        .nade-user img {
          width: 30px;
          border-radius: 50%;
          margin-right: 10px;
        }

        @media only screen and (max-width: ${Dimensions.MOBILE_THRESHHOLD}) {
          .nade-details {
            flex-direction: column;
          }

          .nade-stats {
            margin-top: 10px;
          }
        }
      `}</style>
    </>
  );
};
