import { SiteStats } from "../../api/StatsApi";
import { createAction } from "@reduxjs/toolkit";

export type SignInWarningType = "favorite" | "filterpro" | "vote";

export const toggleNavigationAction = createAction<void>(
  "Global/ToggleNavigation"
);

export const addSiteStatsAction = createAction<SiteStats>(
  "Global/AddSiteStats"
);

export const acceptCookieConcentAction = createAction<void>(
  "Global/AcceptCookieConcent"
);

export const closeNavigationAction = createAction<void>(
  "Global/CloseNavigation"
);

export const displaySignInWarningAction = createAction<SignInWarningType>(
  "Global/DisplaySignInWarning"
);

export const clearSignInWarningAction = createAction<void>(
  "Global/ClearSignInWarning"
);
