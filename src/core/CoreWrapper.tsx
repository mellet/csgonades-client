import { FC } from "react";
import { useEzoidAdLoader } from "../common/adunits/useEzoicAdLoader";
import { CookieConsent } from "../common/CookieConsent";
import { ToastList } from "../common/toast/ToastList";
import { useSetupSession } from "../layout/DataFetchers/useSetupSession";
import { ServiceDown } from "../layout/ServiceDown";
import { SignInWarning } from "./SignInWarning";
import { usePreloadUser } from "./authentication/usePreloadUser";
import { usePageView } from "../utils/Analytics";
import { useFetchNotifications } from "../store/NotificationStore/hooks/useFetchNotifications";

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
