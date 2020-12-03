import { FC, memo, useMemo } from "react";
import { useTheme } from "../../store/SettingsStore/SettingsHooks";
import { FaMoon, FaSun } from "react-icons/fa";
import { Dimensions } from "../../constants/Constants";

export const ThemeToggler: FC = memo(() => {
  const { toggleTheme, theme } = useTheme();

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
          border-radius: ${Dimensions.BORDER_RADIUS};
          outline: none;
          background: #f2f2f2;
          height: ${Math.round(Dimensions.HEADER_HEIGHT * 0.65)}px;
          width: ${Math.round(Dimensions.HEADER_HEIGHT * 0.65)}px;
        }

        .toggle-btn:hover {
          background: #222;
          color: white;
          cursor: pointer;
        }

        .toggle-btn.selected {
          background: #222;
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
