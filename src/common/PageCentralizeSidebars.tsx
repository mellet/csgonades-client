import { FC } from "react";
import { Dimensions } from "../constants/Constants";

type Props = {
  leftSideBar: JSX.Element;
  rightSideBar: JSX.Element;
};

export const PageCentralizeSidebars: FC<Props> = ({
  children,
  leftSideBar,
  rightSideBar,
}) => {
  return (
    <>
      <div className="centralize-wrap">
        <div className="left-sidebar">{leftSideBar}</div>
        <div className="page-centralize">{children}</div>
        <div className="right-sidebar">{rightSideBar}</div>
      </div>
      <style jsx>{`
        .centralize-wrap {
          max-width: ${Dimensions.PAGE_WIDTH +
          4 * Dimensions.GUTTER_SIZE +
          160 * 2}px;
          padding-top: ${Dimensions.GUTTER_SIZE}px;
          padding-left: ${Dimensions.GUTTER_SIZE}px;
          padding-right: ${Dimensions.GUTTER_SIZE}px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 160px 1fr 160px;
          grid-template-areas: "sideleft main sideright";
          grid-column-gap: ${Dimensions.GUTTER_SIZE}px;
        }

        .page-centralize {
          grid-area: main;
        }

        .left-sidebar {
          grid-area: sideleft;
        }

        .right-sidebar {
          grid-area: sideright;
        }

        @media only screen and (max-width: ${Dimensions.TABLET_THRESHHOLD}) {
          .centralize-wrap {
            grid-template-columns: 1fr;
            grid-template-areas: "main";
          }

          .left-sidebar,
          .right-sidebar {
            display: none;
          }
        }

        @media only screen and (max-width: ${Dimensions.MOBILE_THRESHHOLD}) {
          .centralize-wrap {
            padding-left: 10px;
            padding-right: 10px;
          }
        }
      `}</style>
    </>
  );
};
