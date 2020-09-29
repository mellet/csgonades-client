import { FC } from "react";
import { Dimensions } from "../constants/Constants";

export const PageCentralize: FC = ({ children }) => {
  return (
    <>
      <div className="page-centralize">{children}</div>
      <style jsx>{`
        .page-centralize {
          max-width: ${Dimensions.PAGE_WIDTH + 2 * Dimensions.GUTTER_SIZE}px;
          padding-left: ${Dimensions.GUTTER_SIZE}px;
          padding-right: ${Dimensions.GUTTER_SIZE}px;
          margin: 0 auto;
        }

        @media only screen and (max-width: ${Dimensions.MOBILE_THRESHHOLD}) {
          .page-centralize {
            padding-left: 15px;
            padding-right: 15px;
          }
        }
      `}</style>
    </>
  );
};
