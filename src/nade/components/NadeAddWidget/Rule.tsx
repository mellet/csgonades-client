import { FC } from "react";
import { Dimensions } from "../../../constants/Constants";

type Props = {
  icon: JSX.Element;
};

export const Rule: FC<Props> = ({ icon, children }) => {
  return (
    <>
      <div className="rule">
        <span className="icon">{icon}</span>
        <span>{children}</span>
      </div>
      <style jsx>{`
        .rule {
          display: flex;
          gap: ${Dimensions.PADDING_MEDIUM};
          margin-bottom: ${Dimensions.GUTTER_SIZE}px;
        }

        .icon {
          position: relative;
          top: 3px;
        }
      `}</style>
    </>
  );
};
