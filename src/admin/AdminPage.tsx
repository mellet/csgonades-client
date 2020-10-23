import { FC } from "react";
import { Dimensions } from "../constants/Constants";
import { useIsAdminOrModerator } from "../store/AuthStore/AuthHooks";
import { useAdminRoute } from "../store2/AdminStore/hooks";
import { AdminNav } from "./AdminNav";
import { AdminPendingNades } from "./AdminPendingNades";
import { AdminReports } from "./reports/AdminReports";
import { AdminUsers } from "./AdminUsers";
import { useTheme } from "../store/SettingsStore/SettingsHooks";
import { AdminDeclined } from "./AdminDeclined";
import { PageCentralize } from "../common/PageCentralize";

export const AdminPage: FC = () => {
  const { colors } = useTheme();
  const allowedToView = useIsAdminOrModerator();
  const { route } = useAdminRoute();

  if (!allowedToView) {
    return <p>Your not allowed to view this page :(</p>;
  }

  function pageContent() {
    switch (route) {
      case "pending-nades":
        return <AdminPendingNades />;
      case "user":
        return <AdminUsers />;
      case "reports":
        return <AdminReports />;
      case "declined-nades":
        return <AdminDeclined />;
      default:
        return null;
    }
  }

  return (
    <>
      <PageCentralize>
        <div className="admin-container">
          <aside className="admin-nav">
            <AdminNav />
          </aside>
          <div className="admin-content">{pageContent()}</div>
        </div>
      </PageCentralize>

      <style jsx>{`
        .admin-container {
          margin-top: ${Dimensions.GUTTER_SIZE}px;
          display: flex;
          flex-direction: row;
          background: ${colors.DP01};
          border-radius: 5px;
          overflow: hidden;
          padding: 20px 30px;
          margin-bottom: 100px;
        }

        .admin-nav {
          grid-area: sidebar;
          margin-right: ${Dimensions.GUTTER_SIZE}px;
          width: 200px;
        }

        .admin-content {
          flex: 1;
        }
      `}</style>
    </>
  );
};
