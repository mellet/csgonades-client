import { FC } from "react";
import { Dimensions } from "../constants/Constants";

type SpacerProps = {
  vertical?: boolean;
};

export const Spacer: FC<SpacerProps> = ({ children, vertical }) => {
  return (
    <>
      <div className="spacer">{children}</div>
      <style jsx>{`
        .spacer {
          display: inline-flex;
          flex-direction: ${vertical ? "column" : "row"};
          gap: ${Dimensions.GUTTER_SIZE}px;
        }
      `}</style>
    </>
  );
};
