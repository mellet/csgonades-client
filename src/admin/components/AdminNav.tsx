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
        <button onClick={() => changeAdminRoute("user")}>Users</button>
        <button onClick={() => changeAdminRoute("reports")}>Reports</button>
        {isAdmin && (
          <button onClick={() => changeAdminRoute("contact")}>Contacts</button>
        )}
      </div>
      <style jsx>{`
        .admin-nav {
          display: flex;
          flex-direction: column;
          border: 1px solid ${colors.BORDER};
          border-radius: ${Dimensions.BORDER_RADIUS};
          overflow: hidden;
        }

        .admin-nav button {
          border: none;
          background: ${colors.DP01};
          padding: 15px;
          border-bottom: 1px solid ${colors.BORDER};
          outline: none;
          cursor: pointer;
          border-radius: 0;
          text-align: left;
          color: ${colors.TEXT};
          font-weight: 500;
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
