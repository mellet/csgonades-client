import { useMemo } from "react";
import { useSignedInUser } from "../../core/authentication/useSignedInUser";

export const useCanEditNade = (ownerSteamId: string): boolean => {
  const { signedInUser } = useSignedInUser();

  const canEdit = useMemo(() => {
    if (!signedInUser) {
      return false;
    } else if (
      signedInUser.role === "administrator" ||
      signedInUser.role === "moderator"
    ) {
      return true;
    } else if (signedInUser.steamId === ownerSteamId) {
      return true;
    } else {
      return false;
    }
  }, [signedInUser, ownerSteamId]);

  return canEdit;
};
