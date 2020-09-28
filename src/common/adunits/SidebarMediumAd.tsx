import { FC, useEffect, useState } from "react";
import { EzoicPlaceholder } from "./EzoicPlaceholder";
import { Twemoji } from "../Twemoji";
import { Dimensions } from "../../constants/Constants";
import { isMobile } from "react-device-detect";

export const SidebarMediumAd: FC = ({}) => {
  const disabled = isMobile;
  const [isAdBlockEnabled, setIsAdBlockEnabled] = useState(false);

  useEffect(() => {
    if (!window.ezstandalone) {
      setIsAdBlockEnabled(true);
    }
  }, []);

  if (disabled) {
    return null;
  }

  return (
    <>
      {isAdBlockEnabled && (
        <div className="block-msg-wrap">
          <div className="block-msg">
            <strong>
              AdBlock is enabled <Twemoji emoji="😢" />
            </strong>
            <br />
            Disable it to support my work <Twemoji emoji="😍" />
          </div>
        </div>
      )}

      {!isAdBlockEnabled && (
        <div className="ph">
          <EzoicPlaceholder id="172" />
        </div>
      )}

      <style jsx>{`
        .ph {
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
