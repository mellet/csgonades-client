import { FC, memo } from "react";
import dynamic from "next/dynamic";
import { ToastProvider } from "../shared-components/toast/ToastContext";
import { useNewPageView } from "../utils/Analytics";

const ServiceDown = dynamic(
  () =>
    import(/* webpackChunkName: "servicedown" */ "./layout/ServiceDown").then(
      (mod) => mod.ServiceDown
    ),
  { ssr: false }
);

const ToastList = dynamic(
  () =>
    import(
      /* webpackChunkName: "toastlist" */ "../shared-components/toast/ToastList"
    ).then((mod) => mod.ToastList),
  { ssr: false }
);

const SignInWarning = dynamic(
  () =>
    import(/* webpackChunkName: "siginwarning" */ "./SignInWarning").then(
      (mod) => mod.SignInWarning
    ),
  { ssr: false }
);

export const CoreWrapper: FC = memo(({ children }) => {
  useNewPageView();

  return (
    <ToastProvider>
      {children}
      {false && <ServiceDown />}
      <ToastList />
      <SignInWarning />
    </ToastProvider>
  );
});
