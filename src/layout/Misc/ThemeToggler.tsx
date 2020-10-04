import { FC, memo, useMemo } from "react";
import { useTheme } from "../../store/SettingsStore/SettingsHooks";
import { FaMoon } from "react-icons/fa";

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
          <FaMoon size={12} />
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
          border-radius: 6px;
          outline: none;
          padding: 7px 7px 5px 7px;
          background: #f2f2f2;
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
