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
    closeNav();
    if (isAdmin || !IS_PROD) {
      return;
    }
    gtag.pageview(router.asPath);
  }, [router.asPath, isAdmin, closeNav]);
};

export const useGa = () => {
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

  const error = useCallback(
    (description: string, fatal?: boolean) => {
      if (isAdmin || !IS_PROD) {
        return;
      }
      gtag.exception(description, fatal);
    },
    [isAdmin]
  );
  return { error, event };
};
