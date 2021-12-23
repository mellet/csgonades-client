import { FC } from "react";
import { Dimensions } from "../constants/Constants";

type SpacerProps = {
  vertical?: boolean;
};

export const Spacer: FC<SpacerProps> = ({ children, vertical }) => {
  return (
    <>
      <div className="spacer">{children}</div>
      <style jsx global>{`
        .spacer {
          display: inline-flex;
          flex-direction: ${vertical ? "column" : "row"};
        }

        .spacer > * {
          margin-right: ${vertical ? 0 : Dimensions.GUTTER_SIZE}px;
          margin-bottom: ${vertical ? Dimensions.GUTTER_SIZE : 0}px;
        }

        .spacer > *:last-child {
          margin-right: 0;
          margin-bottom: 0;
        }
      `}</style>
    </>
  );
};
