import { useDispatch, useSelector } from "react-redux";
import { signInWarningSelector } from "../GlobalSelectors";
import { useCallback } from "react";
import {
  displaySignInWarningAction,
  SignInWarningType,
  clearSignInWarningAction,
} from "../GlobalStore";

export const useSignInWarning = () => {
  const dispatch = useDispatch();
  const signInWarning = useSelector(signInWarningSelector);

  const setSignInWarning = useCallback(
    (warningType: SignInWarningType) => {
      dispatch(displaySignInWarningAction(warningType));
    },
    [dispatch]
  );

  const clearSignInWarning = useCallback(() => {
    dispatch(clearSignInWarningAction());
  }, [dispatch]);

  return {
    signInWarning,
    setSignInWarning,
    clearSignInWarning,
  };
};
