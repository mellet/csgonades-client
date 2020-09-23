import { FC, memo, useEffect, useState } from "react";
import { useTheme } from "../../store/SettingsStore/SettingsHooks";
import { Checkbox } from "semantic-ui-react";

export const ThemeToggler: FC = memo(() => {
  const { toggleTheme, theme } = useTheme();

  return (
    <>
      <div className="darkmode-toggle">
        <Checkbox toggle checked={theme === "dark"} onClick={toggleTheme} />
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
});
