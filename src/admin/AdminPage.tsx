import { FC } from "react";
import { Dimensions } from "../constants/Constants";
import { useIsAdminOrModerator } from "../store/AuthStore/AuthHooks";
import { useAdminRoute } from "./data/hooks";
import { AdminNav } from "./components/AdminNav";
import { AdminPendingNades } from "./containers/AdminPendingNades";
import { AdminReports } from "./containers/AdminReports";
import { AdminUsers } from "./containers/AdminUsers";
import { AdminDeclined } from "./containers/AdminDeclined";
import { AdminContacts } from "./containers/AdminContacts";
import { AdminWelcome } from "./containers/AdminWelcome";

export const AdminPage: FC = () => {
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
      case "contact":
        return <AdminContacts />;
      default:
        return <AdminWelcome />;
    }
  }

  return (
    <>
      <div className="admin-container">
        <aside className="admin-nav">
          <AdminNav />
        </aside>
        <div className="admin-content">{pageContent()}</div>
      </div>

      <style jsx>{`
        .admin-container {
          margin: ${Dimensions.GUTTER_SIZE}px;
          display: flex;
          flex-direction: row;
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
