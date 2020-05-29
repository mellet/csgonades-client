import { FC } from "react";
import { Dimensions } from "../../constants/Constants";
import { useTheme } from "../../store/SettingsStore/SettingsHooks";
import DarkModeToggle from "react-dark-mode-toggle";

type Props = {};

export const ThemeToggler: FC<Props> = ({}) => {
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

        @media only screen and (max-width: ${Dimensions.MOBILE_THRESHHOLD}) {
          .darkmode-toggle {
            overflow: visible;
          }
        }
      `}</style>
      <style jsx global>{`
        .react-toggle-track {
          background: #545454 !important;
        }
      `}</style>
    </>
  );
};
