import { AppState } from "../store/rootReducer";
import { SignInWarningType } from "./GlobalStore";

export const isNavOpenSelector = (state: AppState): boolean =>
  state.globalStore.isNavOpen;

export const acceptedCookieConsentSelector = (state: AppState): boolean =>
  state.globalStore.acceptedCookieConcent;

export const signInWarningSelector = (
  state: AppState
): SignInWarningType | undefined => state.globalStore.signInWarning;
