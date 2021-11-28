import { useCallback } from "react";
import { useLocalStorage } from "usehooks-ts";

type SignInWarningType = "favorite" | "filterpro" | "addnade";

export const useSignInWarning = () => {
  const [signInWarning, setSignInWarning] =
    useLocalStorage<SignInWarningType | null>("signInWarning", null);

  const clearSignInWarning = useCallback(() => {
    setSignInWarning(null);
  }, [setSignInWarning]);

  return {
    signInWarning,
    setSignInWarning,
    clearSignInWarning,
  };
};
