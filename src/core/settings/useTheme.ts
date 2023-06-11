import { useMemo } from "react";
import { useGa } from "../../utils/Analytics";
import { useLocalStorage } from "usehooks-ts";
import { ThemeColors, ThemeKeys, themes } from "./Themes";
import { useGameMode } from "../useGameMode";

export const useTheme = () => {
  const ga = useGa();
  const { gameMode } = useGameMode();

  const [theme, setTheme] = useLocalStorage<ThemeKeys>("theme", "light");

  const colors: ThemeColors = useMemo(() => {
    if (gameMode === "cs2") {
      return themes[theme + "_cs2"];
    }
    return themes[theme];
  }, [theme, gameMode]);

  function toggleTheme() {
    if (theme === "light") {
      setTheme("dark");
      ga.event({
        category: "settings",
        action: "set_dark_theme",
      });
    } else {
      setTheme("light");
      ga.event({
        category: "settings",
        action: "set_light_theme",
      });
    }
  }

  return {
    theme,
    colors,
    toggleTheme,
  };
};
