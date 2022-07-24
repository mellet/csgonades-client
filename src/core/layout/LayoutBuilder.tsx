import { FC, memo, useMemo } from "react";
import { Dimensions, LayoutBreakpoint } from "../../constants/Constants";
import { useNavigation } from "../global/hooks/useNavigation";
import { useTheme } from "../settings/SettingsHooks";
import { useIsDeviceSize } from "./useDeviceSize";

type Props = {
  header: JSX.Element;
  main: JSX.Element;
  nav?: JSX.Element;
  sidebar?: JSX.Element;
};

export const LayoutBuilder: FC<Props> = memo(
  ({ header, main, sidebar, nav }) => {
    const { colors } = useTheme();
    const { isNavOpen } = useNavigation();
    const { isMobile } = useIsDeviceSize();

    const displayNav = !!nav;
    const displaySidebar = !!sidebar;

    const classNameSelector = useMemo(() => {
      if (!displayNav && !displaySidebar) {
        return "with-main-only";
      } else if (displayNav && displaySidebar) {
        return "with-sidebar-and-nav";
      } else {
        return "default-page";
      }
    }, [displayNav, displaySidebar]);

    return (
      <>
        <header>
          <div className="header-content">{header}</div>
        </header>
        <div id="page" className={classNameSelector}>
          {displayNav && (
            <nav
              hidden={!isNavOpen && isMobile}
              className={isNavOpen ? "open" : "closed"}
            >
              {nav}
            </nav>
          )}

          <main>{main}</main>

          {displaySidebar && <aside id="sidebar">{sidebar}</aside>}
        </div>

        <style jsx>{`
          #page {
            display: grid;
            width: 100%;
            background: ${colors.DP00};
            grid-template-columns: min-content 1fr 300px;
            grid-template-rows: 1fr 1fr 1fr;
            grid-column-gap: ${Dimensions.GUTTER_SIZE}px;
            grid-row-gap: ${Dimensions.GUTTER_SIZE}px;
            min-height: 90vh;
            max-width: ${Dimensions.SITE_WIDTH}px;
            margin: 0 auto;
            padding: ${Dimensions.GUTTER_SIZE}px;
          }

          .default-page {
            grid-template-areas:
              "nav main main"
              "nav main main"
              "nav main main";
          }

          .with-sidebar-and-nav {
            grid-template-areas:
              "nav main sidebar"
              "nav main sidebar"
              "nav main sidebar";
          }

          .with-main-only {
            grid-template-areas:
              "main main main"
              "main main main"
              "main main main";
          }

          header {
            height: ${Dimensions.HEADER_HEIGHT}px;
            background: ${colors.DP03};
            border-bottom: 1px solid ${colors.BORDER};
            width: 100%;
            position: sticky;
            top: 0px;
            z-index: 500;
          }

          .header-content {
            max-width: ${Dimensions.SITE_WIDTH}px;
            padding-left: ${Dimensions.GUTTER_SIZE}px;
            padding-right: ${Dimensions.GUTTER_SIZE}px;
            margin: 0 auto;
          }

          nav {
            grid-area: nav;
          }

          main {
            grid-area: main;
          }

          aside#sidebar {
            grid-area: sidebar;
          }

          @media only screen and (max-width: ${LayoutBreakpoint.TABLET}px) {
            .default-page {
              grid-template-areas:
                "main main main"
                "main main main"
                "main main main";
            }

            .with-sidebar-and-nav {
              grid-template-areas:
                "main main sidebar"
                "main main sidebar"
                "main main sidebar";
            }

            nav {
              position: fixed;
              top: ${Dimensions.HEADER_HEIGHT}px;
              left: 0;
              width: 190px;
              height: calc(100vh - ${Dimensions.HEADER_HEIGHT}px);
              z-index: 900;
              transition: transform 0.1s;
            }

            .open {
              transform: translateX(0);
            }

            .closed {
              transform: translateX(-100%);
            }

            aside#sidebar {
              display: flex;
              flex-wrap: wrap;
            }
          }

          @media only screen and (max-width: ${LayoutBreakpoint.MOBILE}px) {
            #page {
              display: grid;
              min-height: 100vh;
              width: 100%;
              background: ${colors.DP00};
              grid-template-columns: 1fr;
              grid-template-rows: 1fr;
              grid-column-gap: 0px;
              grid-row-gap: 0px;
              padding-bottom: ${Dimensions.GUTTER_SIZE}px;
            }

            .with-sidebar-and-nav {
              grid-column-gap: 0px;
              grid-row-gap: 0px;
              grid-template-areas:
                "main"
                "sidebar";
            }

            .with-main-only {
              grid-template-areas: "main";
            }

            header {
              position: sticky;
              top: 0;
              z-index: 900;
            }

            main {
              grid-area: main;
              height: auto;
            }

            #sidebar {
              background: ${colors.DP02};
              height: auto;
              width: 100%;
              border-radius: ${Dimensions.BORDER_RADIUS};
            }
          }
        `}</style>
        <style jsx global>{`
          body {
            background: ${colors.DP00};
          }
        `}</style>
      </>
    );
  }
);
