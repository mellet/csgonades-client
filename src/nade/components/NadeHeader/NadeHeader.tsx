import { FC } from "react";
import { Dimensions } from "../../../constants/Constants";
import { Nade } from "../../models/Nade";
import { NadeTitleBar } from "./NadeTitleBar";
import dynamic from "next/dynamic";
import { ThemeToggler } from "../../../core/layout/defaultheader/components/ThemeToggler";

const UserNav = dynamic(
  () =>
    import("../../../core/layout/defaultheader/components/UserNav").then(
      (m) => m.UserNav
    ),
  { ssr: false }
);

type Props = {
  nade: Nade;
};

export const NadeHeader: FC<Props> = ({ nade }) => {
  return (
    <>
      <div id="nade-header">
        <div id="nade-title">
          <NadeTitleBar nade={nade} />
        </div>
        <div id="theme-toggler">
          <ThemeToggler />
        </div>
        <UserNav />
      </div>
      <style jsx>{`
        #nade-header {
          display: flex;
          align-items: center;
          height: ${Dimensions.HEADER_HEIGHT}px;
        }

        #nade-title {
          flex: 1;
          margin-right: ${Dimensions.GUTTER_SIZE}px;
        }

        #theme-toggler {
          margin-right: ${Dimensions.GUTTER_SIZE}px;
        }
      `}</style>
    </>
  );
};
