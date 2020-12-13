import { FC, memo, useMemo } from "react";
import { Dimensions } from "../constants/Constants";
import { useNavigation } from "../store/GlobalStore/hooks/useNavigation";
import { useTheme } from "../store/SettingsStore/SettingsHooks";

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
        <div id="page" className={classNameSelector}>
          <header>{header}</header>

          {displayNav && (
            <nav className={isNavOpen ? "open" : "closed"}>{nav}</nav>
          )}

          <main>{main}</main>

          {displaySidebar && <aside id="sidebar">{sidebar}</aside>}
        </div>

        <style jsx>{`
          #page {
            display: grid;
            min-height: 100vh;
            width: 100%;
            background: ${colors.DP00};
            grid-template-columns: 190px 1fr 300px;
          }

          .default-page {
            grid-template-areas:
              "header header header"
              "nav main main"
              "nav main main"
              "nav main main";
          }

          .with-sidebar-and-nav {
            grid-template-areas:
              "header header header"
              "nav main sidebar"
              "nav main sidebar"
              "nav main sidebar";
          }

          .with-main-only {
            grid-template-areas:
              "header header header"
              "main main main"
              "main main main"
              "main main main";
          }

          header {
            grid-area: header;
            height: ${Dimensions.HEADER_HEIGHT}px;
            background: ${colors.DP03};
            border-bottom: 1px solid ${colors.BORDER};
            padding-left: ${Dimensions.GUTTER_SIZE}px;
            padding-right: ${Dimensions.GUTTER_SIZE}px;
            max-width: 100vw;
            overflow: hidden;
          }

          nav {
            grid-area: nav;
            height: calc(100vh - ${Dimensions.HEADER_HEIGHT}px);
            background: ${colors.DP02};
            overflow-y: hidden;
            border-right: 1px solid ${colors.BORDER};
            width: 100%;
          }

          main {
            grid-area: main;
            height: calc(100vh - ${Dimensions.HEADER_HEIGHT}px);
            overflow-y: auto;
            max-width: 100vw;
          }

          #sidebar {
            background: ${colors.DP02};
            height: calc(100vh - ${Dimensions.HEADER_HEIGHT}px);
            overflow-y: hidden;
          }

          #sidebar:hover {
            overflow-y: auto;
          }

          @media only screen and (max-width: 1200px) {
            .default-page {
              grid-template-areas:
                "header header header"
                "main main main"
                "main main main"
                "main main main";
            }

            .with-sidebar-and-nav {
              grid-template-areas:
                "header header header"
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
              z-index: 1;
              transition: transform 0.1s;
            }

            .open {
              transform: translateX(0);
            }

            .closed {
              transform: translateX(-100%);
            }
          }

          @media only screen and (max-width: 950px) {
            #page {
              display: grid;
              min-height: 100vh;
              width: 100%;
              background: ${colors.DP00};
              grid-template-columns: 1fr;
            }

            .with-sidebar-and-nav {
              grid-template-areas:
                "header"
                "main"
                "sidebar";
            }

            header {
              position: sticky;
              top: 0;
              z-index: 1;
            }

            main {
              grid-area: main;
              height: auto;
            }

            #sidebar {
              background: ${colors.DP02};
              height: auto;
              width: 100%;
            }
          }
        `}</style>
      </>
    );
  }
);

/**
 * 
 * 
        @media only screen and (max-width: 1195px) {
          #page {
            grid-template-areas:
              "header header"
              "main main"
              "main main"
              "main main";
          }

          nav {
            position: fixed;
            left: 0;
            bottom: 0;
            top: ${Dimensions.HEADER_HEIGHT}px;
            height: calc(100vh - ${Dimensions.HEADER_HEIGHT}px);
            transform: translateX(-100%);
            transition: transform 0.3s;
            z-index: 1000;
          }

          main {
            height: auto;
          }

          .open {
            transform: translateX(0px);
          }

          .closed {
            transform: translateX(-100%);
          }
        }
 */
