import { useSignedInUser } from "./useSignedInUser";

export const useIsAdminOrModerator = (): boolean => {
  const { signedInUser } = useSignedInUser();

  if (!signedInUser) {
    return false;
  } else if (signedInUser.role === "user") {
    return false;
  }
  return true;
};
