import { FC } from "react";
import { Dimensions } from "../../constants/Constants";
import { User } from "../models/User";
import { useIsAllowedUserEdit } from "../../core/authentication/useIsAllowedUserEdit";
import { useTheme } from "../../core/settings/SettingsHooks";
import { capitalize } from "../../utils/Common";
import { prettyDate, prettyDateTime } from "../../utils/DateUtils";
import { UserEditorModal } from "./UserEditorModal";

type Props = {
  user: User;
};

export const UserDetails: FC<Props> = ({ user }) => {
  const { colors } = useTheme();
  const allowEdit = useIsAllowedUserEdit(user);

  return (
    <>
      <div className="user-details">
        <h1>
          <img src={user.avatar || ""} alt={`avatar for ${user.nickname}`} />{" "}
          <a
            href={`https://steamcommunity.com/profiles/${user.steamId}`}
            rel="noopener noreferrer nofollow"
            target="_blank"
          >
            {user.nickname}
          </a>
        </h1>

        {user.role !== "user" && (
          <span className="user-role-badge">{capitalize(user.role)}</span>
        )}

        <div className="member-since">
          <span>Member since</span> {prettyDate(user.createdAt)}
        </div>

        {allowEdit && user.lastActive && (
          <div className="member-since">
            <span>Last active</span> {prettyDateTime(user.lastActive)}
          </div>
        )}

        {!!user.bio && <div className="bio">{user.bio}</div>}

        {!!user && <UserEditorModal user={user} />}
      </div>
      <style jsx>{`
        .user-details {
          background: ${colors.DP01};
          margin-right: 18px;
          padding: 12px;
          width: 100%;
          border: 1px solid ${colors.BORDER};
          align-self: flex-start;
          border-radius: ${Dimensions.BORDER_RADIUS};
          margin-bottom: ${Dimensions.GUTTER_SIZE};
        }

        .user-details a {
          color: ${colors.TEXT};
        }

        .user-details h1 {
          display: flex;
          align-items: center;
          font-size: 1.2em;
          color: ${colors.TEXT};
        }

        .user-details img {
          border-radius: 50%;
          width: 30px;
          margin-right: 12px;
        }

        .member-since {
          margin-bottom: 12px;
          color: ${colors.TEXT};
        }

        .member-since span {
          font-weight: normal;
          margin-right: 6px;
        }

        .bio {
          margin-bottom: 12px;
          color: ${colors.TEXT};
        }

        .user-role-badge {
          position: absolute;
          top: 12px;
          right: 12px;
          background: ${colors.PRIMARY};
          color: white;
          font-size: 0.8em;
          padding: 3px 6px;
          border-radius: ${Dimensions.BORDER_RADIUS};
        }
      `}</style>
    </>
  );
};
