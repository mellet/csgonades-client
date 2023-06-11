import Link from "next/link";
import { FC, useState } from "react";
import { useTheme } from "../../core/settings/useTheme";
import { useAdminUsers } from "../data/hooks/useAdminUsers";
import { prettyDateTime } from "../../utils/DateUtils";

const USER_LIMIT = 15;

export const AdminUserList: FC = () => {
  const { colors } = useTheme();
  const [page] = useState(1);
  const [sortByActivity, setSortByActivity] = useState(false);
  const { users } = useAdminUsers(page, USER_LIMIT, sortByActivity);

  return (
    <>
      <div className="user-list">
        <button onClick={() => setSortByActivity(false)}>By created at</button>
        <button onClick={() => setSortByActivity(true)}>By last active</button>
        <table id="users">
          <thead>
            <tr>
              <td></td>
              <td>Nickname</td>
              <td>Last active</td>
              <td>Created at</td>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.steamId}>
                <td className="avatar">
                  <img src={user.avatar} />
                </td>
                <td className="nickname">
                  <Link
                    href={`/users/${user.steamId}`}
                    key={user.steamId}
                    legacyBehavior
                  >
                    <a>{user.nickname}</a>
                  </Link>
                </td>
                <td className="last-active">
                  {prettyDateTime(user.lastActive)}
                </td>
                <td className="created-at">{prettyDateTime(user.createdAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <style jsx>{`
        .user-list {
          border-radius: 5px;
          border: 1px solid ${colors.BORDER};
          overflow: hidden;
        }

        #users {
          border-collapse: collapse;
          width: 100%;
        }

        thead td {
          font-weight: normal;
        }

        tr {
          border-bottom: 1px solid ${colors.BORDER};
        }

        td {
          padding: 12px;
          vertical-align: center;
        }

        .avatar {
          width: 50px;
        }

        .avatar img {
          border-radius: 50%;
          display: block;
          width: 100%;
        }

        .nickname {
        }

        .nickname a {
          color: ${colors.TEXT};
        }

        .nickname a:hover {
          text-decoration: underline;
        }

        .last-active {
          white-space: nowrap;
          width: 80px;
        }

        .created-at {
          white-space: nowrap;
          width: 80px;
        }
      `}</style>
    </>
  );
};
