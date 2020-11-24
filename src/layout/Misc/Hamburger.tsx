import { FC, memo } from "react";
import { FaBars } from "react-icons/fa";
import { useNavigation } from "../../store/GlobalStore/hooks/useNavigation";
import { useTheme } from "../../store/SettingsStore/SettingsHooks";

export const Hamburger: FC = memo(({}) => {
  const { colors } = useTheme();
  const { toggleNav } = useNavigation();

  return (
    <>
      <div className="hamburger" onClick={toggleNav}>
        <FaBars />
      </div>
      <style jsx>{`
        .hamburger {
          margin-right: 18px;
          font-size: 24px;
          position: relative;
          top: 2px;
          cursor: pointer;
          display: none;
          color: ${colors.TEXT};
        }

        @media only screen and (max-width: 910px) {
          .hamburger {
            display: block;
          }
        }
      `}</style>
    </>
  );
});
