import { FC } from "react";
import { Dimensions } from "../../constants/Constants";
import { useTheme } from "../../core/settings/SettingsHooks";
import { AdminPageTitle } from "../components/AdminPageTitle";
import { AdminUserList } from "../components/AdminUserList";

export const AdminUserContainer: FC = () => {
  const { colors } = useTheme();
  return (
    <>
      <AdminPageTitle title="Users" description="" />

      <div className="users">
        <AdminUserList />
      </div>
      <style jsx>{`
        .users {
          background: ${colors.DP01};
          border-radius: ${Dimensions.BORDER_RADIUS};
          color: ${colors.TEXT};
          overflow: hidden;
        }
      `}</style>
    </>
  );
};
