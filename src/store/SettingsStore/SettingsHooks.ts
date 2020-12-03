import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "..";
import { useAnalytics } from "../../utils/Analytics";
import { AppState } from "../rootReducer";
import { setThemeAction } from "./SettingsSlice";
import { themes } from "./Themes";

const themeSelector = (state: AppState) => state.settingsStore.theme;

export const useTheme = () => {
  const { event } = useAnalytics();
  const dispatch = useDispatch<AppDispatch>();
  const theme = useSelector(themeSelector);

  const colors = useMemo(() => {
    return themes[theme];
  }, [theme]);

  function toggleTheme() {
    if (theme === "light") {
      dispatch(setThemeAction("dark"));
      event({
        category: "Theme",
        action: "Set Dark",
      });
    } else {
      dispatch(setThemeAction("light"));
      event({
        category: "Theme",
        action: "Set Light",
      });
    }
  }

  return {
    theme,
    colors,
    toggleTheme,
  };
};
