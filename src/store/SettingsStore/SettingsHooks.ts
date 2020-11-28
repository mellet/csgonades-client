import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "..";
import { AppState } from "../rootReducer";
import { setThemeAction } from "./SettingsSlice";
import { themes } from "./Themes";

const themeSelector = (state: AppState) => state.settingsStore.theme;

export const useTheme = () => {
  const dispatch = useDispatch<AppDispatch>();
  const theme = useSelector(themeSelector);

  const colors = useMemo(() => {
    return themes[theme];
  }, [theme]);

  function toggleTheme() {
    if (theme === "light") {
      dispatch(setThemeAction("dark"));
    } else {
      dispatch(setThemeAction("light"));
    }
  }

  return {
    theme,
    colors,
    toggleTheme,
  };
};
