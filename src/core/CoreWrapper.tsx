import { FC, memo } from "react";
import dynamic from "next/dynamic";
import { ToastProvider } from "../shared-components/toast/ToastContext";
import { PageViewTracker } from "./PageViewTracker";
import { SWRConfig } from "swr";
import { UserProfileChecker } from "./UserProfileChecker";

const tenMinutesInMs = 10 * 60 * 1000;

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
  return (
    <SWRConfig
      value={{
        errorRetryCount: 3,
        dedupingInterval: tenMinutesInMs,
        focusThrottleInterval: tenMinutesInMs,
        revalidateOnFocus: false,
        onError: (err, key) => {
          console.error("# Network error", key, err);
        },
      }}
    >
      <GlobalStyles>
        <ToastProvider>
          {children}
          {false && <ServiceDown />}
          <ToastList />
          <SignInWarning />
          <PageViewTracker />
          <UserProfileChecker />
        </ToastProvider>
      </GlobalStyles>
    </SWRConfig>
  );
});

export const CoreWrapperStory: FC = ({ children }) => {
  return (
    <GlobalStyles>
      <ToastProvider>{children}</ToastProvider>
    </GlobalStyles>
  );
};

export const GlobalStyles: FC = ({ children }) => {
  return (
    <>
      {children}
      <style jsx global>{`
        html {
          -webkit-box-sizing: border-box;
          -moz-box-sizing: border-box;
          box-sizing: border-box;
          -webkit-font-smoothing: antialiased;
          scroll-behavior: smooth;
        }

        *,
        *:before,
        *:after {
          -webkit-box-sizing: inherit;
          -moz-box-sizing: inherit;
          box-sizing: inherit;
        }

        body {
          font-family: "Roboto", Helvetica, sans-serif !important;
          font-weight: 300;
          font-size: 16px;
        }

        button {
          font-family: "Roboto", Helvetica, sans-serif !important;
        }

        h1,
        h2,
        h3,
        h4,
        h5 {
          font-family: "Roboto", Helvetica, sans-serif;
          font-weight: 300;
        }

        h1 {
          font-size: 42px;
        }

        h2 {
          font-size: 32px;
          margin-bottom: 32px;
          margin-top: 56px;
        }

        h3 {
          font-size: 24px;
          margin-bottom: 24px;
          margin-top: 48px;
        }

        p {
          font-size: 16px;
          margin-bottom: 20px;
        }

        input,
        button,
        textarea {
          font-family: "Roboto", sans-serif;
        }

        .lead {
          font-size: 24px;
        }

        code {
          vertical-align: bottom;
        }

        a {
          text-decoration: none;
        }
      `}</style>
    </>
  );
};
