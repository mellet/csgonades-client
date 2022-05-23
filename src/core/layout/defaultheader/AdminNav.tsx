import { FC } from "react";
import { useIsAdminOrModerator } from "../../authentication/useIsAdminOrModerator";
import { AdminNavContent } from "./AdminNavContent";

export const AdminNav: FC = ({}) => {
  const isAdminOnMod = useIsAdminOrModerator();

  if (!isAdminOnMod) {
    return null;
  }

  return <AdminNavContent />;
};
