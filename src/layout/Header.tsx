import React, { FC, memo, Suspense } from "react";
import { Hamburger } from "./Misc/Hamburger";
import { Logo } from "./Misc/Logo";
import { Dimensions } from "../constants/Constants";
import { ThemeToggler } from "./Misc/ThemeToggler";

const UserNav = React.lazy(() => import("./Navigation/UserNav"));

const isServer = typeof window === "undefined";

export const Header: FC = memo(() => {
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
          margin-top: -10px;
          margin-bottom: -10px;
        }

        #theme-toggler {
          margin-right: 16px;
        }

        @media only screen and (max-width: 1195px) {
          #header {
            position: fixed;
            left: 0;
            top: 0;
            right: 0;
            z-index: 1000;
          }
        }
      `}</style>
    </>
  );
});
