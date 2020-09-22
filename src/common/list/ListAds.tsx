import { FC, useEffect, useMemo, useState } from "react";
import { isMobileOnly } from "react-device-detect";
import { useTheme } from "../../store/SettingsStore/SettingsHooks";
import { EzoicPlaceholder } from "../adunits/EzoicPlaceholder";
import { Twemoji } from "../Twemoji";

type Props = {
  numNades: number;
};

export const ListAds: FC<Props> = ({ numNades }) => {
  const [isAdBlockEnabled, setIsAdBlockEnabled] = useState(false);

  useEffect(() => {
    if (!window.ezstandalone) {
      setIsAdBlockEnabled(true);
    }
  }, []);

  const adIds = [
    "173",
    "172",
    "176",
    "179",
    "180",
    "181",
    "183",
    "184",
    "185",
    "186",
    "187",
  ];

  const numberOfAds = useMemo(() => {
    const nadeCalc = Math.floor(numNades / 13);

    if (nadeCalc < 5) {
      return nadeCalc;
    }

    return 5;
  }, [numNades]);

  const ads = new Array(numberOfAds).fill(0);

  if (isAdBlockEnabled) {
    return (
      <>
        <div className="block-msg-wrap">
          <div className="block-msg">
            <strong>Oh no!</strong> You have AdBlock enabled{" "}
            <Twemoji emoji="😢" />
            <br />
            Consider disabling it on this site to support my work{" "}
            <Twemoji emoji="😍" />
            <br />
          </div>
        </div>
        <style jsx>{`
          .block-msg-wrap {
            grid-row: 1;
            grid-column: 1 / 4;
            display: flex;
            justify-content: center;
          }

          .block-msg {
            background: #87a600;
            border-radius: 5px;
            padding: 15px 30px;
            color: white;
            text-align: center;
          }

          @media only screen and (max-width: 1020px) {
            .block-msg {
              grid-column: 1 / 2;
            }
          }

          @media only screen and (max-width: 600px) {
            .block-msg {
              grid-row: 2;
              grid-column: 1 / 2;
            }
          }
        `}</style>
      </>
    );
  }

  return (
    <>
      {ads.map((_, i) => {
        const adId = adIds[i] || null;
        if (adId) {
          return <ListAdUnit key={`ad-${i}`} adId={adIds[i]} position={i} />;
        } else {
          return null;
        }
      })}
    </>
  );
};

type AdUnitProps = {
  position: number;
  adId: string;
};

const ListAdUnit: FC<AdUnitProps> = ({ adId, position }) => {
  const { colors } = useTheme();

  function getRowStart() {
    const startRow = isMobileOnly ? 4 : 3;
    const adSpacing = isMobileOnly ? 10 : 5;

    return startRow + adSpacing * position;
  }

  const rowStart = getRowStart();

  return (
    <>
      <div className="ph-inlist">
        <EzoicPlaceholder id={adId} />
      </div>
      <style jsx>{`
        .ph-inlist {
          grid-row: ${rowStart} / ${rowStart + 1};
          grid-column: 2 / 3;
          max-height: 263px;
          background: ${colors.DP02};
          border-radius: 5px;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        @media only screen and (max-width: 1020px) {
          .ph-inlist {
            grid-column: 2 / 3;
          }
        }

        @media only screen and (max-width: 600px) {
          .ph-inlist {
            grid-column: 1 / 2;
          }
        }
      `}</style>
    </>
  );
};
