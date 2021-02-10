import { FC, memo, useMemo } from "react";
import { useTheme } from "../../../settings/SettingsHooks";
import { FaMoon, FaSun } from "react-icons/fa";

export const ThemeToggler: FC = memo(() => {
  const { toggleTheme, theme, colors } = useTheme();

  const classNameBuild = useMemo(() => {
    const base = ["toggle-btn"];

    if (theme === "dark") {
      base.push("selected");
    }

    return base.join(" ");
  }, [theme]);

  return (
    <>
      <div className="darkmode-toggle">
        <button className={classNameBuild} onClick={toggleTheme}>
          {theme === "dark" && (
            <FaSun size={18} style={{ position: "relative", top: 2 }} />
          )}
          {theme === "light" && (
            <FaMoon size={16} style={{ position: "relative", top: 2 }} />
          )}
        </button>
      </div>
      <style jsx>{`
        .darkmode-toggle {
          display: block;
          display: flex;
          align-items: center;
        }

        .toggle-btn {
          border: none;
          padding: 0;
          margin: 0;
          border-radius: 8px;
          outline: none;
          background: transparent;
          width: 40px;
          height: 40px;
          border: 1px solid ${colors.buttonBorder};
        }

        .toggle-btn:hover {
          background: #222;
          color: white;
          cursor: pointer;
        }

        .toggle-btn.selected {
          color: white;
        }

        .toggle-btn.selected:hover {
          background: #f2f2f2;
          color: #111;
        }
      `}</style>
    </>
  );
});
