import React, { FC, memo, Suspense } from "react";
import { Hamburger } from "./components/Hamburger";
import { Logo } from "./components/Logo";
import { Dimensions } from "../../../constants/Constants";
import { ThemeToggler } from "./components/ThemeToggler";

const UserNav = React.lazy(() => import("./components/UserNav"));

const isServer = typeof window === "undefined";

export const HeaderDefault: FC = memo(() => {
  return (
    <>
      <div id="header">
        <div className="header-wrap">
          <Hamburger />
          <Logo />

          <div className="spacer"></div>
          <div id="theme-toggler">
            <ThemeToggler />
          </div>
          {!isServer && (
            <Suspense fallback={<div />}>
              <UserNav />
            </Suspense>
          )}
        </div>
      </div>

      <style jsx>{`
        #header {
          height: ${Dimensions.HEADER_HEIGHT}px;
        }

        .header-wrap {
          display: flex;
          align-items: center;
          height: ${Dimensions.HEADER_HEIGHT}px;
        }

        .spacer {
          flex: 1;
          display: flex;
          justify-content: space-around;
          height: 60px;
        }

        #theme-toggler {
          margin-right: 16px;
        }
      `}</style>
    </>
  );
});
