import Link from "next/link";
import { FC, memo } from "react";
import { useIsAdminOrModerator } from "../../store/AuthStore/AuthHooks";
import { useTheme } from "../../store/SettingsStore/SettingsHooks";

export const AdminLink: FC = memo(() => {
  const { colors } = useTheme();
  const isAdminOrMod = useIsAdminOrModerator();

  if (!isAdminOrMod) {
    return null;
  }

  return (
    <>
      <div className="admin-link-box">
        <Link href="/admin" as="/admin" prefetch={false}>
          <a className="admin-link">Dashboard</a>
        </Link>
      </div>
      <style jsx>{`
        .admin-link-box {
          position: fixed;
          bottom: 10px;
          left: 10px;
          background: white;
          border: 1px solid ${colors.BORDER};
          background: ${colors.DP01};
          border-radius: 5px;
          opacity: 0;
          transition: opacity 0.15s;
        }

        .admin-link-box:hover {
          opacity: 1;
        }

        .admin-link {
          display: block;
          padding: 10px 20px;
          color: #444;
        }
      `}</style>
    </>
  );
});
