import { FC, memo } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { LayoutBreakpoint } from "../../../../constants/Constants";
import { useNavigation } from "../../../global/hooks/useNavigation";
import { useTheme } from "../../../settings/useTheme";

export const Hamburger: FC = memo(({}) => {
  const { colors } = useTheme();
  const { toggleNav, isNavOpen } = useNavigation();

  return (
    <>
      <button className="hamburger" onClick={toggleNav}>
        {isNavOpen ? (
          <FaTimes
            size={30}
            style={{ position: "relative", left: -4, top: -1 }}
          />
        ) : (
          <FaBars
            size={24}
            style={{ position: "relative", left: -1, top: 2 }}
          />
        )}
      </button>
      <style jsx>{`
        .hamburger {
          margin-right: 3px;
          cursor: pointer;
          display: none;
          color: ${colors.TEXT};
          width: 30px;
          height: 30px;
          opacity: 0.85;
          transition: opacity 0.15s;
          padding: 0;
          border: none;
          background: transparent;
        }

        .hamburger:hover {
          opacity: 1;
        }

        @media only screen and (max-width: ${LayoutBreakpoint.TABLET}px) {
          .hamburger {
            display: block;
          }
        }
      `}</style>
    </>
  );
});
