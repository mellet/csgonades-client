import React, { FC, memo } from "react";
import { Hamburger } from "./components/Hamburger";
import { Logo } from "./components/Logo";
import { Dimensions } from "../../../constants/Constants";
import { ThemeToggler } from "./components/ThemeToggler";
import dynamic from "next/dynamic";
import { Cs2Warning } from "./components/Cs2Warning";
import { useGameMode } from "../../useGameMode";
import { useIsDeviceSize } from "../useDeviceSize";

const UserNav = dynamic(
  () =>
    import(/* webpackChunkName: "usernav" */ "./components/UserNav").then(
      (m) => m.UserNav
    ),
  { ssr: false }
);

export const HeaderDefault: FC = memo(() => {
  const { gameMode } = useGameMode();
  const { isMobile } = useIsDeviceSize();

  return (
    <>
      <div id="header">
        {gameMode === "cs2" && !isMobile && <Cs2Warning />}

        <div className="header-wrap">
          <Hamburger />
          <Logo />

          <div className="spacer"></div>

          <div id="theme-toggler">
            <ThemeToggler />
          </div>
          <UserNav />
        </div>
      </div>

      <style jsx>{`
        .header-wrap {
          display: flex;
          align-items: center;
          height: ${Dimensions.HEADER_HEIGHT}px;
        }

        #header {
          height: ${Dimensions.HEADER_HEIGHT}px;
        }

        .spacer {
          flex: 1;
          display: flex;
          justify-content: space-around;
          height: ${Dimensions.HEADER_HEIGHT}px;
        }

        #theme-toggler {
          margin-right: ${Dimensions.GUTTER_SIZE}px;
        }
      `}</style>
    </>
  );
});
