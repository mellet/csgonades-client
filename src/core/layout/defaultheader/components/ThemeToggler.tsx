import { FC, memo } from "react";
import { useTheme } from "../../../settings/useTheme";
import { FaMoon, FaSun } from "react-icons/fa";
import { SquareButton } from "../../../../shared-components/buttons/IconButton/SquareButton";

export const ThemeToggler: FC = memo(() => {
  const { toggleTheme, theme } = useTheme();

  const activeColor = theme === "dark" ? "#b8af76" : "#768fb8";

  return (
    <>
      <div className="darkmode-toggle">
        <SquareButton
          icon={theme === "dark" ? <FaSun size={18} /> : <FaMoon size={16} />}
          onClick={toggleTheme}
          activeColor={activeColor}
        ></SquareButton>
      </div>
    </>
  );
});
