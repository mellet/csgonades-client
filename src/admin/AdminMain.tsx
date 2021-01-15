import { FC } from "react";
import { Dimensions } from "../constants/Constants";
import { useIsAdminOrModerator } from "../core/authentication/useIsAdminOrModerator";
import { useAdminRoute } from "./data/hooks";
import { AdminNavigation } from "./navigation/AdminNavigation";
import { AdminPendingNadesPage } from "./views/AdminPendingNadesPage";
import { AdminReports } from "./views/AdminReports";
import { AdminUsers } from "./views/AdminUsers";
import { AdminDeclinedNades } from "./views/AdminDeclinedNades";
import { AdminContactPage } from "./views/AdminContactPage";
import { AdminWelcome } from "./views/AdminWelcome";
import { AdminAuditView } from "./views/AdminAuditView";

export const AdminMain: FC = () => {
  const allowedToView = useIsAdminOrModerator();
  const { route } = useAdminRoute();

  if (!allowedToView) {
    return <p>Your not allowed to view this page :(</p>;
  }

  function pageContent() {
    switch (route) {
      case "pending-nades":
        return <AdminPendingNadesPage />;
      case "user":
        return <AdminUsers />;
      case "reports":
        return <AdminReports />;
      case "declined-nades":
        return <AdminDeclinedNades />;
      case "contact":
        return <AdminContactPage />;
      case "audit":
        return <AdminAuditView />;
      default:
        return <AdminWelcome />;
    }
  }

  return (
    <>
      <div className="admin-container">
        <aside className="admin-nav">
          <AdminNavigation />
        </aside>
        <div className="admin-content">{pageContent()}</div>
      </div>

      <style jsx>{`
        .admin-container {
          display: flex;
          flex-direction: row;
          margin: ${Dimensions.GUTTER_SIZE}px;
          overflow: hidden;
        }

        .admin-nav {
          grid-area: sidebar;
          margin-right: ${Dimensions.GUTTER_SIZE}px;
        }

        .admin-content {
          flex: 1;
        }
      `}</style>
    </>
  );
};
