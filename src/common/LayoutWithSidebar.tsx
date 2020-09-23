import { FC } from "react";
import { Dimensions } from "../constants/Constants";

type Props = {
  sidebar: JSX.Element;
};

export const LayoutWithSidebar: FC<Props> = ({ sidebar, children }) => {
  return (
    <>
      <div id="layout-with-sidebar">
        <div id="lws-main">{children}</div>
        <aside id="lws-sidebar">{sidebar}</aside>
      </div>
      <style jsx>{`
        #layout-with-sidebar {
          max-width: ${Dimensions.PAGE_WIDTH + 2 * Dimensions.GUTTER_SIZE}px;
          padding-left: ${Dimensions.GUTTER_SIZE}px;
          padding-right: ${Dimensions.GUTTER_SIZE}px;
          padding-top: ${Dimensions.GUTTER_SIZE}px;
          padding-bottom: 100px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 300px;
          grid-column-gap: ${Dimensions.GUTTER_SIZE}px;
          grid-template-areas:
            "main side"
            "main side";
        }

        #lws-main {
          grid-area: main;
        }

        #lws-sidebar {
          grid-area: side;
        }

        @media only screen and (max-width: 1200px) {
          #layout-with-sidebar {
            grid-template-columns: 1fr 1fr;
            grid-column-gap: 0px;
            grid-row-gap: ${Dimensions.GUTTER_SIZE}px;
            grid-template-areas:
              "main main"
              "side side";
          }
        }
      `}</style>
    </>
  );
};
