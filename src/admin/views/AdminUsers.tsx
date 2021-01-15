import { FC } from "react";
import { Dimensions } from "../../constants/Constants";
import { useTheme } from "../../store/SettingsStore/SettingsHooks";
import { AdminPageTitle } from "../ui/AdminPageTitle";
import { AdminUserList } from "../ui/AdminUserList";

export const AdminUsers: FC = () => {
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
