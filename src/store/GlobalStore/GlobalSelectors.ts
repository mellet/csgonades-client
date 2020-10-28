import { AppState } from "..";
import { SiteStats } from "../../api/StatsApi";
import { SignInWarningType } from "./GlobalActions";

export const siteStatsSelector = (state: AppState): SiteStats =>
  state.globalStore.stats;

export const isNavOpenSelector = (state: AppState): boolean =>
  state.globalStore.isNavOpen;

export const acceptedCookieConsentSelector = (state: AppState): boolean =>
  state.globalStore.acceptedCookieConcent;

export const signInWarningSelector = (
  state: AppState
): SignInWarningType | undefined => state.globalStore.signInWarning;
