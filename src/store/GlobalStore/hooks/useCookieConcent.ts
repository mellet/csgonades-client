import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { acceptedCookieConsentSelector } from "../GlobalSelectors";
import { acceptCookieConcentAction } from "../GlobalStore";

export const useCookieConcent = () => {
  const dispatch = useDispatch();
  const acceptedCookieConsent = useSelector(acceptedCookieConsentSelector);

  const acceptCookieConcent = useCallback(() => {
    dispatch(acceptCookieConcentAction());
  }, [dispatch]);

  return {
    acceptedCookieConsent,
    acceptCookieConcent,
  };
};
