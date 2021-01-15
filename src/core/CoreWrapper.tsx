import { FC } from "react";
import { useEzoidAdLoader } from "../shared-components/adunits/useEzoicAdLoader";
import { CookieConsent } from "../shared-components/CookieConsent";
import { ToastList } from "../shared-components/toast/ToastList";
import { useSetupSession } from "./layout/useSetupSession";
import { ServiceDown } from "./layout/ServiceDown";
import { SignInWarning } from "./SignInWarning";
import { usePreloadUser } from "./authentication/usePreloadUser";
import { usePageView } from "../utils/Analytics";
import { useFetchNotifications } from "../notification/data/hooks/useFetchNotifications";

export const CoreWrapper: FC = ({ children }) => {
  useSetupSession();
  usePageView();
  usePreloadUser();
  useEzoidAdLoader();
  useFetchNotifications();

  return (
    <>
      {children}
      <CookieConsent />
      <ServiceDown />
      <ToastList />
      <SignInWarning />
    </>
  );
};
