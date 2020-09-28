import { FC, useEffect, useState } from "react";
import { EzoicPlaceholder } from "./EzoicPlaceholder";
import { PageCentralize } from "../PageCentralize";
import { Dimensions } from "../../constants/Constants";
import { useTheme } from "../../store/SettingsStore/SettingsHooks";
import { Twemoji } from "../Twemoji";

export const TopAdPlaceholder: FC = () => {
  const { colors } = useTheme();
  const [isAdBlockEnabled, setIsAdBlockEnabled] = useState(false);

  useEffect(() => {
    if (!window.ezstandalone) {
      setIsAdBlockEnabled(true);
    }
  }, []);

  return (
    <>
      <PageCentralize>
        <div className="ph-top">
          {isAdBlockEnabled && (
            <div className="block-msg">
              <strong>
                AdBlock is enabled <Twemoji emoji="😢" />
              </strong>
              <br />
              Disable it to support my work <Twemoji emoji="😍" />
              <br />
            </div>
          )}
          {!isAdBlockEnabled && <EzoicPlaceholder id="175" />}
        </div>
      </PageCentralize>
      <style jsx>{`
        .ph-top {
          display: flex;
          justify-content: space-around;
          align-items: center;
          margin-top: ${Dimensions.GUTTER_SIZE / 2}px;
          min-height: 90px;
          background: ${colors.DP01};
          border-radius: 5px;
        }

        .block-msg {
          text-align: center;
        }
      `}</style>
    </>
  );
};
