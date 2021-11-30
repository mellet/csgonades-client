import { useSignedInUser } from "./useSignedInUser";

export const useIsSignedIn = (): boolean => {
  const { signedInUser } = useSignedInUser();
  return Boolean(signedInUser);
};
