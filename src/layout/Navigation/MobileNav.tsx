import { FC, memo, useMemo } from "react";
import { FaTimes } from "react-icons/fa";
import { AnimationTimings } from "../../constants/Constants";
import { useNavigation } from "../../store/GlobalStore/GlobalHooks";
import { useTheme } from "../../store/SettingsStore/SettingsHooks";
import { NewNav } from "../NewNav";

export const MobileNav: FC = memo(() => {
  const { colors } = useTheme();
  const { toggleNav } = useNavigation();
  const { isNavOpen } = useNavigation();

  const mobileNavClassName = useMemo(() => {
    if (isNavOpen) {
      return "open";
    }
  }, [isNavOpen]);

  return (
    <>
      <aside id="mobile-navigation" className={mobileNavClassName}>
        <nav>
          <div className="exit-nav" onClick={toggleNav}>
            <FaTimes />
          </div>
          <NewNav />
        </nav>
      </aside>
      <style jsx>{`
        #mobile-navigation {
          position: fixed;
          top: 0;
          left: 0;
          bottom: 0;
          z-index: 999;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          overflow-y: auto;
          overflow-x: hidden;
          background: ${colors.DP02};
          width: 250px;
        }

        #mobile-navigation {
          transform: translateX(-100%);
          transition: transform ${AnimationTimings.fast};
        }

        #mobile-navigation.open {
          transform: translateX(0);
        }

        #mobile-navigation {
          display: none;
        }

        .exit-nav {
          padding-left: 15px;
          padding-top: 18px;
          padding-bottom: 16px;
          color: ${colors.TEXT};
          font-size: 30px;
        }

        nav {
          display: flex;
          flex-direction: column;
        }

        ul {
          list-style: none;
          padding: 0;
          margin: 0;
          width: 100%;
        }

        @media only screen and (max-width: 910px) {
          #mobile-navigation {
            display: block;
          }
        }
      `}</style>
    </>
  );
});
