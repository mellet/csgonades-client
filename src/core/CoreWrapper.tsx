import { FC } from "react";
import { useEzoidAdLoader } from "../shared-components/adunits/useEzoicAdLoader";
import { CookieConsent } from "../shared-components/CookieConsent";
import { ToastList } from "../shared-components/toast/ToastList";
import { useSetupSession } from "./layout/useSetupSession";
import { ServiceDown } from "./layout/ServiceDown";
import { SignInWarning } from "./SignInWarning";
import { usePageView } from "../utils/Analytics";

export const CoreWrapper: FC = ({ children }) => {
  useSetupSession();
  usePageView();
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
