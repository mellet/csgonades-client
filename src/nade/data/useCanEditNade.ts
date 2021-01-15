import { useMemo } from "react";
import { useSelector } from "react-redux";
import { userSelector } from "../../core/authentication/AuthSelectors";

export const useCanEditNade = (ownerSteamId: string): boolean => {
  const user = useSelector(userSelector);

  const canEdit = useMemo(() => {
    if (!user) {
      return false;
    } else if (user.role === "administrator" || user.role === "moderator") {
      return true;
    } else if (user.steamId === ownerSteamId) {
      return true;
    } else {
      return false;
    }
  }, [user, ownerSteamId]);

  return canEdit;
};
