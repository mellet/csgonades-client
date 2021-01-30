import { FC } from "react";
import { useEzoidAdLoader } from "../shared-components/adunits/useEzoicAdLoader";
import { useSetupSession } from "./layout/useSetupSession";
import { usePageView } from "../utils/Analytics";
import dynamic from "next/dynamic";

const CookieConsent = dynamic(
  () =>
    import("../shared-components/CookieConsent").then(
      (mod) => mod.CookieConsent
    ),
  { ssr: false }
);

const ServiceDown = dynamic(
  () => import("./layout/ServiceDown").then((mod) => mod.ServiceDown),
  { ssr: false }
);

const ToastList = dynamic(
  () =>
    import("../shared-components/toast/ToastList").then((mod) => mod.ToastList),
  { ssr: false }
);

const SignInWarning = dynamic(
  () => import("./SignInWarning").then((mod) => mod.SignInWarning),
  { ssr: false }
);

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
