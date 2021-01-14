import { useSelector } from "react-redux";
import { userSelector } from "./AuthSelectors";

export const useIsSignedIn = (): boolean => {
  const user = useSelector(userSelector);
  if (!user) {
    return false;
  }
  return true;
};
