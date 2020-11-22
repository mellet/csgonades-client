import { FC } from "react";
import { Dimensions } from "../../constants/Constants";
import { useTheme } from "../../store/SettingsStore/SettingsHooks";
import { UserList } from "../components/UserList";

export const AdminUsers: FC = () => {
  const { colors } = useTheme();
  return (
    <>
      <div className="users">
        <UserList />
      </div>
      <style jsx>{`
        .users {
          background: ${colors.DP01};
          border-radius: ${Dimensions.BORDER_RADIUS};
          overflow: hidden;
          color: ${colors.TEXT};
        }
      `}</style>
    </>
  );
};
