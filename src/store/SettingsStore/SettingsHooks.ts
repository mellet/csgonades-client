import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "..";
import { setThemeAction } from "./SettingsActions";
import { themes } from "./Themes";

const themeSelector = (state: AppState) => state.settingsStore.theme;

export const useTheme = () => {
  const dispatch = useDispatch();
  const theme = useSelector(themeSelector);

  /*
  const toggleTheme = useCallback(() => {
    if (theme === "light") {
      dispatch(setThemeAction("dark"));
    } else {
      dispatch(setThemeAction("light"));
    }
  }, [dispatch, theme]);
  */

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
