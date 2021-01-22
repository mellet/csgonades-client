export type ThemeColors = {
  BORDER: string;
  boxBg: string;
  boxTitleBg: string;
  DP00: string;
  DP01: string;
  DP02: string;
  DP03: string;
  ERROR: string;
  FAV_YELLOW: string;
  filterBg: string;
  filterBgHover: string;
  filterBorder: string;
  filterColor: string;
  filterFavColor: string;
  filterResetBg: string;
  filterResetDisabledBg: string;
  footerBg: string;
  footerColor: string;
  GREY: string;
  HIGHLIGHT_BG: string;
  jumboGradientEnd: string;
  jumboGradientStart: string;
  NADE_ITEM_HIGHLIGHT: string;
  nadeItemHeadingBg: string;
  NAV_HOVER: string;
  PRIMARY_10: string;
  PRIMARY_BLACK: string;
  PRIMARY: string;
  primaryBtnBg: string;
  primaryBtnHover: string;
  SHADOW: string;
  SITE_BG: string;
  SUCCESS: string;
  TEXT: string;
  UI_BG: string;
  WARNING: string;
};

type Themes = {
  dark: ThemeColors;
  light: ThemeColors;
};

const DARK_THEME: ThemeColors = {
  DP00: "#141414",
  DP01: "#1f1f1f",
  DP02: "#292929",
  DP03: "#363636",
  SITE_BG: "#121212",
  UI_BG: "#212121",
  PRIMARY: "#364958",
  PRIMARY_10: "rgba(28, 143, 192, 0.1)",
  PRIMARY_BLACK: "#262626",
  BORDER: "rgba(0, 0, 0, 1)",
  SUCCESS: "#8cc01c",
  ERROR: "#c01c1c",
  WARNING: "#c05b1c",
  GREY: "#a1a1a1",
  TEXT: "white",
  NAV_HOVER: "rgba(28, 143, 192, 0.1)",
  NADE_ITEM_HIGHLIGHT: "#009982",
  nadeItemHeadingBg: "#232323",
  footerBg: "#212121",
  footerColor: "white",
  primaryBtnBg: "#363636",
  primaryBtnHover: "#404040",
  filterBg: "#09384d",
  filterBgHover: "#0d516e",
  filterColor: "white",
  filterFavColor: "#ebda49",
  filterResetBg: "#6e0000",
  filterResetDisabledBg: "#544242",
  filterBorder: "#121212",
  FAV_YELLOW: "#bd9700",
  HIGHLIGHT_BG: "#3c4759",
  boxBg: "#1e1e1e",
  boxTitleBg: "#232323",
  jumboGradientStart: "#1e1e1e",
  jumboGradientEnd: "#232323",
  SHADOW: "none",
};

export const LIGHT_THEME: ThemeColors = {
  DP00: "#ededed",
  DP01: "#f5f5f5",
  DP02: "#fafafa",
  DP03: "#fff",
  SITE_BG: "#f3f3f3",
  UI_BG: "white",
  PRIMARY: "#364958",
  PRIMARY_10: "rgba(28, 143, 192, 0.1)",
  PRIMARY_BLACK: "#262626",
  BORDER: "rgba(0, 0, 0, 0.07)",
  SUCCESS: "#8cc01c",
  ERROR: "#c01c1c",
  WARNING: "#c05b1c",
  GREY: "#808080",
  TEXT: "#424242",
  NAV_HOVER: "#f7f7f7",
  NADE_ITEM_HIGHLIGHT: "#00c9ab",
  nadeItemHeadingBg: "#eee",
  footerBg: "#1c90c0",
  footerColor: "white",
  primaryBtnBg: "rgba(34, 148, 201, 0.9)",
  primaryBtnHover: "rgba(34, 148, 201, 1.0)",
  filterBg: "#545b69",
  filterBgHover: "rgba(28, 143, 192, 1)",
  filterColor: "#ffffff",
  filterFavColor: "#ffbb00",
  filterResetBg: "#6e0000",
  filterResetDisabledBg: "#ccabab",
  filterBorder: "#5c6069",
  FAV_YELLOW: "#fac800",
  HIGHLIGHT_BG: "#e8f1ff",
  boxBg: "#fff",
  boxTitleBg: "#f9f9f9",
  jumboGradientStart: "#f9f9f9",
  jumboGradientEnd: "#eeeeee",
  SHADOW: "none",
};

export const themes: Themes = {
  dark: DARK_THEME,
  light: LIGHT_THEME,
};

export const DEFAULT_THEME = {
  theme: {
    colors: LIGHT_THEME,
  },
};

export type ThemeKeys = keyof typeof themes;
