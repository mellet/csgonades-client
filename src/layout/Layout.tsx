import { FC, memo, useEffect } from "react";
import { ToastList } from "../common/toast/ToastList";
import { usePreloadUser } from "../store/AuthStore/AuthHooks";
import { useTheme } from "../store/SettingsStore/SettingsHooks";
import { useAnalytics, usePageView } from "../utils/Analytics";
import { useSetupSession } from "./DataFetchers/useSetupSession";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { ServiceDown } from "./ServiceDown";
import { AdminLink } from "./Misc/AdminLink";
import { CookieConsent } from "../common/CookieConsent";
import { MapNav } from "./Navigation/MapNav";
import { Dimensions } from "../constants/Constants";
import { SignInWarning } from "../maps/components/SignInWarning";
import { useEzoidAdLoader } from "../common/adunits/useEzoicAdLoader";
import { useNumNadesVisited } from "../features/tracker/useTracker";
import { useNavigation } from "../store/GlobalStore/hooks/useNavigation";
import { SiteNav } from "./Navigation/SiteNav";

type Props = {
  sideBar?: JSX.Element;
};

export const Layout: FC<Props> = memo(({ children }) => {
  const { colors } = useTheme();
  const { isNavOpen } = useNavigation();
  useGlobalAnalyticsEvents();
  useSetupSession();
  usePageView();
  usePreloadUser();
  useEzoidAdLoader();

  return (
    <>
      <div id="page">
        <CookieConsent />

        <header>
          <Header />
        </header>

        <nav className={isNavOpen ? "open" : "closed"}>
          <MapNav />
          <SiteNav />
          <Footer />
        </nav>

        <main>{children}</main>

        <aside></aside>
      </div>

      <ServiceDown />
      <ToastList />
      <AdminLink />
      <SignInWarning />

      <style jsx>{`
        #page {
          display: grid;
          min-height: 100vh;
          width: 100%;
          background: ${colors.DP00};
          grid-template-columns: min-content 1fr;
          overflow: hidden;
          grid-template-areas:
            "header header"
            "nav main"
            "nav main"
            "nav main";
        }

        header {
          grid-area: header;
          height: ${Dimensions.HEADER_HEIGHT}px;
        }

        nav {
          grid-area: nav;
          height: calc(100vh - ${Dimensions.HEADER_HEIGHT}px);
          background: ${colors.DP02};
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          border-right: 1px solid ${colors.BORDER};
        }

        #footer-ph {
          grid-area: footer-ph;
        }

        main {
          grid-area: main;
          height: calc(100vh - ${Dimensions.HEADER_HEIGHT}px);
          overflow-y: auto;
        }

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
      `}</style>
    </>
  );
});

const useGlobalAnalyticsEvents = () => {
  const { event } = useAnalytics();
  const numNadesVisited = useNumNadesVisited();

  const onExitingSite = () => {
    event({
      category: "CloseAnalytics",
      action: "Num Nades Visited",
      label: `Value(${numNadesVisited})`,
      value: numNadesVisited,
      nonInteraction: true,
    });
  };

  useEffect(() => {
    window.addEventListener("beforeunload", onExitingSite);

    return () => {
      window.removeEventListener("beforeunload", onExitingSite);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [numNadesVisited]);
};
