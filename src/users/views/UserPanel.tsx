import { FC } from "react";
import { Dimensions } from "../../constants/Constants";
import { User } from "../models/User";
import { useIsAllowedUserEdit } from "../../core/authentication/useIsAllowedUserEdit";
import { useTheme } from "../../core/settings/SettingsHooks";
import { capitalize } from "../../utils/Common";
import { prettyDate, prettyDateTime } from "../../utils/DateUtils";
import { ButtonWithIcon } from "../../shared-components/buttons/ButtonWithIcon";
import { FaEdit } from "react-icons/fa";
import Link from "next/link";
import { RenderMarkdown } from "../../nade/components/RenderMarkdown";

type Props = {
  user: User;
};

export const UserPanel: FC<Props> = ({ user }) => {
  const { colors } = useTheme();
  const allowEdit = useIsAllowedUserEdit(user);

  const { role, bio, nickname, avatar, steamId, createdAt, lastActive } = user;

  return (
    <>
      <div className="user-details">
        <h1 className="avatar">
          <img src={avatar || ""} alt={`avatar for ${nickname}`} />{" "}
          <a
            href={`https://steamcommunity.com/profiles/${steamId}`}
            rel="noopener noreferrer nofollow"
            target="_blank"
          >
            {nickname}
          </a>
        </h1>

        <div className="user-role">
          {role !== "user" && (
            <span className="user-role-badge">{capitalize(role)}</span>
          )}
        </div>

        <div className="member-since">
          <span className="label">Member since</span>
          <br />
          {prettyDate(createdAt)}
        </div>

        {allowEdit && lastActive && (
          <div className="active-since">
            <span className="label">Last active</span>
            <br />
            {prettyDateTime(lastActive)}
          </div>
        )}

        {bio && (
          <div className="bio">
            <span className="label">Bio</span>
            <br />
            <RenderMarkdown value={bio} />
          </div>
        )}

        {allowEdit && (
          <div className="action">
            <Link href={`/users/${steamId}/edit`}>
              <ButtonWithIcon icon={<FaEdit />} value="Edit user profile" />
            </Link>
          </div>
        )}
      </div>
      <style jsx>{`
        .user-details {
          display: grid;
          width: 100%;
          background: ${colors.DP00};
          grid-template-columns: 1fr min-content;
          grid-column-gap: ${Dimensions.GUTTER_SIZE / 2}px;
          grid-row-gap: ${Dimensions.GUTTER_SIZE / 2}px;
          grid-template-areas:
            "avatar role"
            "member member"
            "active active"
            "bio bio"
            "action action";
          background: ${colors.DP01};
          margin-right: 18px;
          padding: 12px;
          width: 100%;
          border: 1px solid ${colors.BORDER};
          align-self: flex-start;
          border-radius: ${Dimensions.BORDER_RADIUS};
          margin-bottom: ${Dimensions.GUTTER_SIZE};
        }

        .avatar {
          grid-area: avatar;
        }

        .user-role {
          grid-area: role;
        }

        .member-since {
          grid-area: member;
        }

        .action {
          grid-area: action;
        }

        .active-since {
          grid-area: active;
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
          width: 36px;
          margin-right: 4px;
        }

        .label {
          font-weight: 400;
          font-size: 14px;
        }

        .bio {
          grid-area: bio;
          margin-bottom: 12px;
          color: ${colors.TEXT};
          overflow-wrap: break-word;
          word-wrap: break-word;
        }

        .user-role-badge {
          display: inline-block;
          background: ${colors.PRIMARY};
          color: white;
          font-size: 0.8em;
          padding: 1px 4px;
          border-radius: ${Dimensions.BORDER_RADIUS};
        }
      `}</style>
    </>
  );
};
