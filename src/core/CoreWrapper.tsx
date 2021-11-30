import { FC, memo } from "react";
import dynamic from "next/dynamic";

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

export const CoreWrapper: FC = memo(({ children }) => {
  return (
    <>
      {children}
      {false && <ServiceDown />}
      <ToastList />
      <SignInWarning />
    </>
  );
});
