import packageJson from "../../package.json";

// Set to true if you want to use API on localhost
const USE_DEV_API = false;

export const IS_PROD = process.env.NODE_ENV === "production";

const useLocalApi = USE_DEV_API && !IS_PROD;

export const AppConfig = {
  enableEzoic: false,
  enableAdsense: IS_PROD,
  API_URL: useLocalApi ? "http://localhost:5000" : "https://api.csgonades.com",
  SIGN_IN_URL: useLocalApi
    ? "http://localhost:5000/auth/steam"
    : "https://api.csgonades.com/auth/steam",
  revalidationTime: 60 * 30, // Refetch time for map and frontpage
  maintenance: false,
} as const;

export const Dimensions = {
  BORDER_RADIUS: "5px",
  BUTTON_HEIGHT: 36,
  GUTTER_SIZE: 16,
  HEADER_HEIGHT: 55,
  MEDIUM_DEVIDE: "1280px",
  MOBILE_THRESHHOLD: "850px",
  STICKY_TOP: 55 + 16,
  NAV_HEIGHT: 50,
  PADDING_HUGE: "24px",
  PADDING_LARGE: "18px",
  PADDING_MEDIUM: "12px",
  PADDING_SMALL: "6px",
  PAGE_WIDTH: 1300 + 4 * 30,
  SIDEBAR_WIDTH: "180px",
  TABLET_THRESHHOLD: "1024px",
  SITE_WIDTH: 1500,
} as const;

export const AnimationTimings = {
  fast: "0.15s",
  medium: "0.3s",
  slow: "0.5s",
} as const;

export const LayerPosition = {
  MODAL: 999,
  UI: 950,
  UNDER_UI: 900,
} as const;

export const LayoutBreakpoint = {
  MOBILE: 800,
  TABLET: 1300,
};

export const APP_VERSION = packageJson.version;
