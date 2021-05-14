import Link from "next/link";
import { FC } from "react";
import { Dimensions } from "../../constants/Constants";
import { useIsAdmin } from "../../core/authentication/useIsAdmin";
import { useTheme } from "../../core/settings/SettingsHooks";

export const AdminNavigation: FC = () => {
  const { colors } = useTheme();
  const isAdmin = useIsAdmin();

  return (
    <>
      <div className="admin-nav">
        <Link href="/admin/pending">
          <button>Pending nades</button>
        </Link>
        <Link href="/admin/declined">
          <button>Declined nades</button>
        </Link>
        <Link href="/admin/comments">
          <button>Recent comments</button>
        </Link>
        {isAdmin && (
          <Link href="/admin/users">
            <button>Users</button>
          </Link>
        )}
        <Link href="/admin/reports">
          <button>Reports</button>
        </Link>

        <Link href="/admin/audit">
          <button>Audit</button>
        </Link>

        {isAdmin && (
          <Link href="/admin/contact">
            <button>Contacts</button>
          </Link>
        )}
      </div>
      <style jsx>{`
        .admin-nav {
          border-radius: ${Dimensions.BORDER_RADIUS};
          border: 1px solid ${colors.BORDER};
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }

        .admin-nav button {
          background: ${colors.DP01};
          border-radius: 0;
          border: none;
          color: ${colors.TEXT};
          cursor: pointer;
          font-weight: 500;
          outline: none;
          padding: 15px;
          text-align: left;
          border-bottom: 1px solid ${colors.BORDER};
        }

        .admin-nav button:hover {
          background: ${colors.DP02};
        }

        .admin-nav button:last-child {
          border-bottom: none;
        }
      `}</style>
    </>
  );
};
