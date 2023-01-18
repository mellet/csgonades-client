import { FC } from "react";
import { Dimensions } from "../../constants/Constants";

type Props = {
  left?: JSX.Element;
  right?: JSX.Element;
};

export const SplitLayout: FC<Props> = ({ left, right }) => {
  return (
    <>
      <div className="split-box">
        <div className="left">{left}</div>
        <div className="right">{right}</div>
      </div>
      <style jsx>{`
        .split-box {
          display: flex;
          gap: ${Dimensions.GUTTER_SIZE}px;
        }

        .left {
          max-width: 50%;
          flex: 1;
        }

        .right {
          flex: 1;
        }
      `}</style>
    </>
  );
};
