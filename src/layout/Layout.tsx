import { FC, memo, useEffect } from "react";
import { ToastList } from "../common/toast/ToastList";
import { usePreloadUser } from "../store/AuthStore/AuthHooks";
import { useTheme } from "../store/SettingsStore/SettingsHooks";
import { useAnalytics, usePageView } from "../utils/Analytics";
import { useSetupSession } from "./DataFetchers/useSetupSession";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { MobileNav } from "./Navigation/MobileNav";
import { ServiceDown } from "./ServiceDown";
import { AdminLink } from "./Misc/AdminLink";
import { CookieConsent } from "../common/CookieConsent";
import { MapNav } from "./Navigation/MapNav";
import { Dimensions } from "../constants/Constants";
import { SignInWarning } from "../maps/components/SignInWarning";
import { useEzoidAdLoader } from "../common/adunits/useEzoicAdLoader";
import { useNumNadesVisited } from "../features/tracker/useTracker";

type Props = {
  sideBar?: JSX.Element;
};

export const Layout: FC<Props> = memo(({ children }) => {
  const { colors } = useTheme();
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

        <div id="navigation"></div>

        <nav>
          <MapNav />
          <Footer />
        </nav>

        <main>{children}</main>

        <aside></aside>
      </div>

      <ServiceDown />
      <ToastList />
      <MobileNav />
      <AdminLink />
      <SignInWarning />

      <style jsx>{`
        #page {
          display: grid;
          height: 100vh;
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
          background: ${colors.DP01};
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        #footer-ph {
          grid-area: footer-ph;
        }

        main {
          height: calc(100vh - ${Dimensions.HEADER_HEIGHT}px);
          grid-area: main;
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
