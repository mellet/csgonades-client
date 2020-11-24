import packageJson from "../../package.json";

export const IS_PROD = process.env.NODE_ENV === "production";

export const Config = {
  API_URL: IS_PROD ? "https://api.csgonades.com" : "http://localhost:5000",
  SIGN_IN_URL: IS_PROD
    ? "https://api.csgonades.com/auth/steam"
    : "http://localhost:5000/auth/steam",
  ADS_ENABLED: true,
};

export const Dimensions = {
  PAGE_WIDTH: 1300 + 4 * 30,
  GUTTER_SIZE: 16,
  SIDEBAR_WIDTH: "180px",
  HEADER_HEIGHT: 60,
  NAV_HEIGHT: 50,
  PADDING_SMALL: "6px",
  PADDING_MEDIUM: "12px",
  PADDING_LARGE: "18px",
  PADDING_HUGE: "24px",
  MOBILE_THRESHHOLD: "850px",
  TABLET_THRESHHOLD: "1024px",
  MEDIUM_DEVIDE: "1280px",
  BORDER_RADIUS: "5px",
  BUTTON_HEIGHT: 40,
};

export const AnimationTimings = {
  fast: "0.15s",
  medium: "0.3s",
  slow: "0.5s",
};

export const LayerPosition = {
  MODAL: 999,
  UNDER_UI: 900,
  UI: 950,
};

export const APP_VERSION = packageJson.version;
