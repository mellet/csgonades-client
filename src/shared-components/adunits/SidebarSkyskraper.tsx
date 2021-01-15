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
      <EzoicPlaceholder id="188" />

      <style jsx>{`
        .block-msg-wrap {
          display: flex;
          justify-content: center;
          margin-bottom: ${Dimensions.GUTTER_SIZE}px;
          margin-top: ${Dimensions.GUTTER_SIZE}px;
        }

        .block-msg {
          background: #87a600;
          border-radius: 5px;
          color: white;
          padding: 15px 30px;
          text-align: center;
        }
      `}</style>
    </>
  );
};
