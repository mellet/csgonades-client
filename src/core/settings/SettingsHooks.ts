import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../store";
import { useGa } from "../../utils/Analytics";
import { AppState } from "../store/rootReducer";
import { setThemeAction } from "./SettingsSlice";
import { themes } from "./Themes";

const themeSelector = (state: AppState) => state.settingsStore.theme;

export const useTheme = () => {
  const ga = useGa();
  const dispatch = useDispatch<AppDispatch>();
  const theme = useSelector(themeSelector);

  const colors = useMemo(() => {
    return themes[theme];
  }, [theme]);

  function toggleTheme() {
    if (theme === "light") {
      dispatch(setThemeAction("dark"));
      ga.event({
        category: "settings",
        action: "Set Dark Theme",
      });
    } else {
      dispatch(setThemeAction("light"));
      ga.event({
        category: "settings",
        action: "Set Light Theme",
      });
    }
  }

  return {
    theme,
    colors,
    toggleTheme,
  };
};
