import { FC, memo, useMemo } from "react";
import { Dimensions } from "../../constants/Constants";
import { useNavigation } from "../global/hooks/useNavigation";
import { useTheme } from "../settings/SettingsHooks";
import { useMediaQuery } from "react-responsive";

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
    const isMobile = useMediaQuery({ maxWidth: 600 });

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
            grid-template-columns: min-content min-content 1fr 300px min-content;
            grid-template-rows: ${Dimensions.HEADER_HEIGHT}px 1fr 1fr 1fr;
            grid-column-gap: ${Dimensions.GUTTER_SIZE}px;
            grid-row-gap: ${Dimensions.GUTTER_SIZE}px;
            min-height: 100vh;
          }

          .default-page {
            grid-template-areas:
              "header header header header header"
              ". nav main main ."
              ". nav main main ."
              ". nav main main .";
          }

          .with-sidebar-and-nav {
            grid-template-areas:
              "header header header header header"
              ". nav main sidebar ."
              ". nav main sidebar ."
              ". nav main sidebar .";
          }

          .with-main-only {
            grid-template-areas:
              "header header header header header"
              ". main main main ."
              ". main main main ."
              ". main main main .";
          }

          header {
            grid-area: header;
            height: ${Dimensions.HEADER_HEIGHT}px;
            background: ${colors.DP03};
            border-bottom: 1px solid ${colors.BORDER};
            padding-left: ${Dimensions.GUTTER_SIZE}px;
            padding-right: ${Dimensions.GUTTER_SIZE}px;
            max-width: 100vw;
            position: sticky;
            top: 0px;
            z-index: 500;
          }

          nav {
            grid-area: nav;
          }

          main {
            grid-area: main;
            max-width: 100vw;
          }

          aside#sidebar {
            grid-area: sidebar;
          }

          @media only screen and (max-width: 1200px) {
            .default-page {
              grid-template-areas:
                "header header header header header"
                ". main main main ."
                ". main main main ."
                ". main main main .";
            }

            .with-sidebar-and-nav {
              grid-template-areas:
                "header header header header header"
                ". main main sidebar ."
                ". main main sidebar ."
                ". main main sidebar .";
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
          }

          @media only screen and (max-width: 950px) {
            #page {
              display: grid;
              min-height: 100vh;
              width: 100%;
              background: ${colors.DP00};
              grid-template-columns: 1fr;
              grid-template-rows: auto;
              padding-bottom: ${Dimensions.GUTTER_SIZE}px;
            }

            .with-sidebar-and-nav {
              grid-template-areas:
                "header header header"
                ". main ."
                ". sidebar .";
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
      </>
    );
  }
);
