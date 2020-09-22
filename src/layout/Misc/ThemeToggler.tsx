import { FC, useEffect, useState } from "react";
import { useTheme } from "../../store/SettingsStore/SettingsHooks";
import DarkModeToggle from "react-dark-mode-toggle";

export const ThemeToggler: FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { toggleTheme, theme } = useTheme();

  useEffect(() => {
    if (theme === "dark") {
      setIsDarkMode(true);
    } else {
      setIsDarkMode(false);
    }
  }, [theme]);

  return (
    <>
      <div className="darkmode-toggle">
        <DarkModeToggle
          checked={isDarkMode}
          onChange={toggleTheme}
          size={45}
          speed={3}
        />
      </div>
      <style jsx>{`
        .darkmode-toggle {
          display: block;
          margin-left: 20px;
          display: flex;
          align-items: center;
        }
      `}</style>
    </>
  );
};
