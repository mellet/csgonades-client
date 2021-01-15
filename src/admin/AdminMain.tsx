import { FC } from "react";
import { Dimensions } from "../constants/Constants";
import { useIsAdminOrModerator } from "../core/authentication/useIsAdminOrModerator";
import { useAdminRoute } from "./data/hooks";
import { AdminNavigation } from "./components/AdminNavigation";
import { AdminPendingNadesPage } from "./components/views/AdminPendingNadesPage";
import { AdminReports } from "./components/views/AdminReports";
import { AdminUsers } from "./components/views/AdminUsers";
import { AdminDeclinedNades } from "./components/views/AdminDeclinedNades";
import { AdminContactPage } from "./components/views/AdminContactPage";
import { AdminWelcome } from "./components/views/AdminWelcome";
import { AdminAuditView } from "./components/views/AdminAuditView";

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
