import { User } from "../../users/models/User";
import { useSignedInUser } from "./useSignedInUser";

export const useIsAllowedUserEdit = (user: User): boolean => {
  const { signedInUser } = useSignedInUser();

  if (!signedInUser) {
    return false;
  }

  if (
    signedInUser.role === "administrator" ||
    signedInUser.role === "moderator"
  ) {
    return true;
  }

  if (signedInUser.steamId === user.steamId) {
    return true;
  }

  return false;
};
