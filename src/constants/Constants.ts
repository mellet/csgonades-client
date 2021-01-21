import packageJson from "../../package.json";

export const Config = {
  ADS_ENABLED: true,
  API_URL: process.env.NEXT_PUBLIC_API_URL,
  SIGN_IN_URL: process.env.NEXT_PUBLIC_SIGN_IN_URL,
};

export const Dimensions = {
  BORDER_RADIUS: "5px",
  BUTTON_HEIGHT: 36,
  GUTTER_SIZE: 16,
  HEADER_HEIGHT: 55,
  MEDIUM_DEVIDE: "1280px",
  MOBILE_THRESHHOLD: "850px",
  NAV_HEIGHT: 50,
  PADDING_HUGE: "24px",
  PADDING_LARGE: "18px",
  PADDING_MEDIUM: "12px",
  PADDING_SMALL: "6px",
  PAGE_WIDTH: 1300 + 4 * 30,
  SIDEBAR_WIDTH: "180px",
  TABLET_THRESHHOLD: "1024px",
};

export const AnimationTimings = {
  fast: "0.15s",
  medium: "0.3s",
  slow: "0.5s",
};

export const LayerPosition = {
  MODAL: 999,
  UI: 950,
  UNDER_UI: 900,
};

export const APP_VERSION = packageJson.version;
