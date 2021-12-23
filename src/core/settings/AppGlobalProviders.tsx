import { FC } from "react";
import { ToastProvider } from "../../shared-components/toast/ToastContext";

export const AppGlobalProviders: FC = ({ children }) => {
  return (
    <>
      <ToastProvider>
        <GlobalStyles>{children}</GlobalStyles>
      </ToastProvider>
    </>
  );
};

export const StoryBookThemeProvider: FC = ({ children }) => {
  return (
    <>
      <ToastProvider>{children}</ToastProvider>
    </>
  );
};

const GlobalStyles: FC = ({ children }) => {
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
          font-size: 18px;
          margin-bottom: 22px;
        }

        input {
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
