import { FC } from "react";
import { Dimensions } from "../../constants/Constants";
import { Nade } from "../models/Nade";
import { useTheme } from "../../core/settings/SettingsHooks";
import { prettyDate } from "../../utils/DateUtils";
import { PageLink } from "../../shared-components/PageLink";
import { pluralize } from "../../utils/Common";

type Props = {
  nade: Nade;
};

export const NadeDetails: FC<Props> = ({ nade }) => {
  const { colors } = useTheme();
  return (
    <>
      <div className="nade-details">
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
          padding: 12px 16px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid ${colors.BORDER};
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
          width: 24px;
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
