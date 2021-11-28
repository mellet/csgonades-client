import { useMemo } from "react";
import { useGa } from "../../utils/Analytics";
import { ThemeKeys, themes } from "./Themes";
import { useLocalStorage } from "usehooks-ts";

export const useTheme = () => {
  const ga = useGa();
  const [theme, setTheme] = useLocalStorage<ThemeKeys>("theme", "light");

  const colors = useMemo(() => {
    return themes[theme];
  }, [theme]);

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
