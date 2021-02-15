import { FC, useEffect, useState } from "react";
import { EzoicPlaceholder } from "./EzoicPlaceholder";
import { Twemoji } from "../Twemoj/Twemoji";
import { isMobile } from "react-device-detect";

export const SidebarAdSticky: FC = ({}) => {
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
            <div className="block-msg-header">
              <strong>Oh no!</strong> You have AdBlock enabled{" "}
              <Twemoji emoji="😢" />
            </div>
            Consider disabling it on this site to keep the site running{" "}
            <Twemoji emoji="😍" />
          </div>
        </div>
      )}

      {!isAdBlockEnabled && (
        <div className="ph">
          <EzoicPlaceholder id="192" />
        </div>
      )}

      <style jsx>{`
        .block-msg-wrap {
          display: flex;
          justify-content: center;
          border-radius: 8px;
          overflow: hidden;
        }

        .block-msg-header {
          margin-bottom: 10px;
        }

        .block-msg {
          background: #87a600;
          color: white;
          padding: 12px 16px;
        }
      `}</style>
    </>
  );
};
