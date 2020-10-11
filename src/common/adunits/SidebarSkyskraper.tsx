import { FC } from "react";
import { EzoicPlaceholder } from "./EzoicPlaceholder";
import { Dimensions } from "../../constants/Constants";
import { isMobile } from "react-device-detect";

export const SidebarSkyskraperAd: FC = ({}) => {
  const disabled = isMobile;

  if (disabled) {
    return null;
  }

  return (
    <>
      <div className="ph">
        <EzoicPlaceholder id="188" />
      </div>

      <style jsx>{`
        .ph {
          width: 100%;
        }

        .block-msg-wrap {
          display: flex;
          justify-content: center;
          margin-top: ${Dimensions.GUTTER_SIZE}px;
          margin-bottom: ${Dimensions.GUTTER_SIZE}px;
        }

        .block-msg {
          background: #87a600;
          border-radius: 5px;
          padding: 15px 30px;
          color: white;
          text-align: center;
        }
      `}</style>
    </>
  );
};
