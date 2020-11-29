import { FC } from "react";
import { Dimensions } from "../../constants/Constants";
import { useSignedInUser } from "../../store/AuthStore/AuthHooks";
import { useTheme } from "../../store/SettingsStore/SettingsHooks";
import { useAdminRoute } from "../data/hooks";

export const AdminNav: FC = () => {
  const { colors } = useTheme();
  const user = useSignedInUser();
  const { changeAdminRoute } = useAdminRoute();

  if (!user) {
    return null;
  }

  const isAdmin = user.role === "administrator";

  return (
    <>
      <div className="admin-nav">
        <button onClick={() => changeAdminRoute("pending-nades")}>
          Pending nades
        </button>
        <button onClick={() => changeAdminRoute("declined-nades")}>
          Declined nades
        </button>
        {isAdmin && (
          <button onClick={() => changeAdminRoute("user")}>Users</button>
        )}
        <button onClick={() => changeAdminRoute("reports")}>Reports</button>
        <button onClick={() => changeAdminRoute("audit")}>Audit</button>
        {isAdmin && (
          <button onClick={() => changeAdminRoute("contact")}>Contacts</button>
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
          border-bottom: 1px solid ${colors.BORDER};
          border-radius: 0;
          border: none;
          color: ${colors.TEXT};
          cursor: pointer;
          font-weight: 500;
          outline: none;
          padding: 15px;
          text-align: left;
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
