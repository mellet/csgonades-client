import { FC } from "react";
import { useEzoidAdLoader } from "../common/adunits/useEzoicAdLoader";
import { CookieConsent } from "../common/CookieConsent";
import { ToastList } from "../common/toast/ToastList";
import { useSetupSession } from "../layout/DataFetchers/useSetupSession";
import { ServiceDown } from "../layout/ServiceDown";
import { SignInWarning } from "./SignInWarning";
import { usePreloadUser } from "../store/AuthStore/AuthHooks";
import { usePageView } from "../utils/Analytics";

export const CoreWrapper: FC = ({ children }) => {
  useSetupSession();
  usePageView();
  usePreloadUser();
  useEzoidAdLoader();

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
