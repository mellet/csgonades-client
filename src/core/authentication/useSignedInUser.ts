import { useSelector } from "react-redux";
import { userSelector } from "./AuthSelectors";

export const useSignedInUser = () => {
  const user = useSelector(userSelector);
  return user;
};
