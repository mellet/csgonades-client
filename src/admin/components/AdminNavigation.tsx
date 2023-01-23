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
        <Link href="/admin/pending" passHref>
          <button>Pending nades</button>
        </Link>
        <Link href="/admin/declined" passHref>
          <button>Declined nades</button>
        </Link>
        <Link href="/admin/deleted" passHref>
          <button>Deleted nades</button>
        </Link>
        <Link href="/admin/comments" passHref>
          <button>Recent comments</button>
        </Link>
        <Link href="/admin/reports" passHref>
          <button>Reports</button>
        </Link>
        <Link href="/admin/audit" passHref>
          <button>Audit</button>
        </Link>
        {isAdmin && (
          <Link href="/admin/users" passHref>
            <button>Users</button>
          </Link>
        )}
        {isAdmin && (
          <Link href="/admin/contact" passHref>
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
