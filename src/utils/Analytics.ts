import { useCallback, useEffect } from "react";
import { useIsAdmin } from "../core/authentication/useIsAdmin";
import { useRouter } from "next/router";
import { useNavigation } from "../core/global/hooks/useNavigation";
import * as gtag from "../utils/gtag";

const IS_PROD = process.env.NODE_ENV === "production";

export const useNewPageView = (): void => {
  const { closeNav } = useNavigation();
  const isAdmin = useIsAdmin();
  const router = useRouter();
  useEffect(() => {
    const handleRouteChange = (url: URL) => {
      closeNav();
      if (isAdmin || !IS_PROD) {
        return;
      }
      gtag.pageview(url);
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events, isAdmin, closeNav]);
};

export const useGaEvent = () => {
  const isAdmin = useIsAdmin();

  const event = useCallback(
    (opts: gtag.GTagEvent) => {
      if (isAdmin || !IS_PROD) {
        return;
      }
      gtag.event(opts);
    },
    [isAdmin]
  );

  return event;
};
