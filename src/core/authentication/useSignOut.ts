import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { AuthApi } from "./AuthApi";
import { signOutAction } from "./AuthSlice";

export const useSignOut = () => {
  const dispatch = useDispatch();
  const signOut = useCallback(() => {
    AuthApi.signOut().then(() => {
      dispatch(signOutAction());
    });
  }, [dispatch]);
  return signOut;
};
