import { FC } from "react";
import { EzoicPlaceholder } from "../../common/adunits/EzoicPlaceholder";
import { Dimensions } from "../../constants/Constants";

export const TopAdPlaceholder: FC = () => {
  return (
    <>
      <div className="ph-top">
        <EzoicPlaceholder id="175" />
      </div>
      <style jsx>{`
        .ph-top {
          display: flex;
          justify-content: space-around;
          align-items: center;
          max-width: ${Dimensions.PAGE_WIDTH}px;
          margin: 0 auto;
          padding-top: ${Dimensions.GUTTER_SIZE}px;
        }
      `}</style>
    </>
  );
};
