export type ThemeColors = {
  BORDER: string;
  DARK_BORDER: string;
  boxBg: string;
  boxTitleBg: string;
  DP00: string;
  DP01: string;
  DP02: string;
  DP03: string;
  DP03_transparent: string;
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
  primaryBtnActive: string;
  SHADOW: string;
  SITE_BG: string;
  SUCCESS: string;
  TEXT: string;
  UI_BG: string;
  WARNING: string;
  buttonBorder: string;
  buttonDefaultIcon: string;
  reportRed: string;
  link: string;
  linkHover: string;
  focusOutline: string;
  buttonBg: string;
  buttonPrimaryBg: string;
  buttonBgHover: string;
  buttonBgActive: string;
  smokeLogo: string;
};

type Themes = {
  dark: ThemeColors;
  dark_cs2: ThemeColors;
  light: ThemeColors;
  light_cs2: ThemeColors;
};

const DARK_THEME: ThemeColors = {
  DP00: "#141414",
  DP01: "#1f1f1f",
  DP02: "#292929",
  DP03: "#363636",
  DP03_transparent: "rgba(54, 54, 54, 0.9)",
  SITE_BG: "#121212",
  UI_BG: "#212121",
  PRIMARY: "rgba(53, 135, 176, 1)",
  PRIMARY_10: "rgba(53, 135, 176, 0.1)",
  PRIMARY_BLACK: "#262626",
  BORDER: "rgba(0, 0, 0, 1)",
  DARK_BORDER: "rgba(0, 0, 0, 1)",
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
  primaryBtnBg: "rgba(53, 135, 176, 0.95)",
  primaryBtnHover: "rgba(53, 135, 176, 1)",
  primaryBtnActive: "rgba(53, 135, 176, 1)",
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
  buttonBorder: "rgba(255,255,255, 0.1)",
  buttonDefaultIcon: "#fff",
  reportRed: "red",
  link: "#148ec7",
  linkHover: "#10a5eb",
  focusOutline: "#fff",
  buttonPrimaryBg: "rgba(28, 143, 192, 1)",
  buttonBgHover: "#1784b3",
  buttonBgActive: "rgba(53, 135, 176, 1)",
  buttonBg: "#1f1f1f",
  smokeLogo: "#c7c7c7",
};

export const LIGHT_THEME: ThemeColors = {
  DP00: "#ededed",
  DP01: "#f5f5f5",
  DP02: "#fafafa",
  DP03: "#fff",
  DP03_transparent: "rgba(230, 230, 230, 0.9)",
  SITE_BG: "#f3f3f3",
  UI_BG: "white",
  PRIMARY: "rgba(62, 157, 204, 1)",
  PRIMARY_10: "rgba(28, 143, 192, 0.1)",
  PRIMARY_BLACK: "#262626",
  BORDER: "rgba(0, 0, 0, 0.1)",
  DARK_BORDER: "rgba(0, 0, 0, 0.15)",
  SUCCESS: "#8cc01c",
  ERROR: "#c01c1c",
  WARNING: "#c05b1c",
  GREY: "#808080",
  TEXT: "#424242",
  NAV_HOVER: "#f7f7f7",
  NADE_ITEM_HIGHLIGHT: "#00c9ab",
  nadeItemHeadingBg: "#eee",
  footerBg: "#454545",
  footerColor: "white",
  primaryBtnBg: "rgba(62, 157, 204, 0.95)",
  primaryBtnHover: "rgba(62, 157, 204, 1)",
  primaryBtnActive: "rgba(62, 157, 204, 1)",
  filterBg: "#545b69",
  filterBgHover: "rgba(28, 143, 192, 1)",
  filterColor: "#ffffff",
  filterFavColor: "#ffbb00",
  filterResetBg: "#6e0000",
  filterResetDisabledBg: "#ccabab",
  filterBorder: "#5c6069",
  FAV_YELLOW: "#ed9302",
  HIGHLIGHT_BG: "#e8f1ff",
  boxBg: "#fff",
  boxTitleBg: "#f9f9f9",
  jumboGradientStart: "#f9f9f9",
  jumboGradientEnd: "#eeeeee",
  SHADOW: "none",
  buttonBorder: "rgba(0, 0, 0, 0.1)",
  buttonDefaultIcon: "#111",
  reportRed: "red",
  link: "#148ec7",
  linkHover: "#10a5eb",
  focusOutline: "#263942",
  buttonPrimaryBg: "rgba(28, 143, 192, 1)",
  buttonBgHover: "#fff",
  buttonBgActive: "#fff",
  buttonBg: "#ededed",
  smokeLogo: "#EFEFEF",
};

const LIGHT_THEME_CS2: ThemeColors = {
  ...LIGHT_THEME,
  PRIMARY: "rgba(228, 135, 22, 1)",
  PRIMARY_10: "rgba(228, 135, 22, 0.1)",
  primaryBtnBg: "rgba(228, 135, 22, 0.95)",
  primaryBtnHover: "rgba(228, 135, 22, 1)",
  link: "rgba(201, 116, 12, 0.9)",
  linkHover: "rgba(201, 116, 12, 1)",
};

const DARK_THEME_CS2: ThemeColors = {
  ...DARK_THEME,
  PRIMARY: "rgba(228, 135, 22, 1)",
  PRIMARY_10: "rgba(228, 135, 22, 0.1)",
  primaryBtnBg: "rgba(228, 135, 22, 0.95)",
  primaryBtnHover: "rgba(228, 135, 22, 1)",
  link: "rgba(201, 116, 12, 0.9)",
  linkHover: "rgba(201, 116, 12, 1)",
  buttonBgActive: "rgba(228, 135, 22, 1)",
};

export const themes: Themes = {
  light: LIGHT_THEME,
  light_cs2: LIGHT_THEME_CS2,
  dark: DARK_THEME,
  dark_cs2: DARK_THEME_CS2,
};

export const DEFAULT_THEME = {
  theme: {
    colors: LIGHT_THEME,
  },
};

export type ThemeKeys = keyof typeof themes;
