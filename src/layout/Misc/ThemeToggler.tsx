import { FC } from "react";
import { useTheme } from "../../store/SettingsStore/SettingsHooks";
import DarkModeToggle from "react-dark-mode-toggle";

export const ThemeToggler: FC = () => {
  const { toggleTheme, theme } = useTheme();

  const checked = theme === "dark";

  return (
    <>
      <div className="darkmode-toggle">
        <DarkModeToggle
          checked={checked}
          onChange={toggleTheme}
          size={45}
          speed={3}
        />
      </div>
      <style jsx>{`
        .darkmode-toggle {
          display: block;
          margin-left: 20px;
          height: 30px;
          display: flex;
          align-items: center;
        }
      `}</style>
    </>
  );
};
