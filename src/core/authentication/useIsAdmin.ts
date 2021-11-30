import { useSignedInUser } from "./useSignedInUser";

export const useIsAdmin = (): boolean => {
  const { signedInUser } = useSignedInUser();
  if (!signedInUser) {
    return false;
  }

  if (signedInUser.role === "administrator") {
    return true;
  }

  return false;
};
