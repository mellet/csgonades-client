import { FC, useEffect, useMemo, useState } from "react";
import { isMobile } from "react-device-detect";
import { useTheme } from "../../store/SettingsStore/SettingsHooks";
import { EzoicPlaceholder } from "../adunits/EzoicPlaceholder";

type Props = {
  numNades: number;
};

export const ListAds: FC<Props> = ({ numNades }) => {
  const [initialNumNades] = useState(numNades);
  const [isAdBlockEnabled, setIsAdBlockEnabled] = useState(false);

  useEffect(() => {
    if (!window.ezstandalone) {
      setIsAdBlockEnabled(true);
    }
  }, []);

  const adIds = [
    "188",
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
    const nadeCalc = Math.floor(initialNumNades / 13);

    if (nadeCalc < 5) {
      return nadeCalc;
    }

    return 5;
  }, [initialNumNades]);

  const ads = new Array(numberOfAds).fill(0);

  if (isAdBlockEnabled) {
    return null;
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

  const order = useMemo(() => {
    return 2 + 5 * position;
  }, [position]);

  if (position === 0 && !isMobile) {
    return (
      <>
        <div className="ph-inlist">
          <EzoicPlaceholder id={adId} />
        </div>
        <style jsx>{`
          .ph-inlist {
            width: 100%;
            background: ${colors.DP02};
            border-radius: 5px;
            overflow: hidden;
            display: flex;
            align-items: center;
            justify-content: center;
            grid-row: 2 / 4;
            grid-column: 3;
            max-height: 600px;
          }

          @media only screen and (max-width: 1020px) {
            .ph-inlist {
              display: none;
            }
          }
        `}</style>
      </>
    );
  }

  return (
    <>
      <div className="ph-inlist">
        <EzoicPlaceholder id={adId} />
      </div>
      <style jsx>{`
        .ph-inlist {
          grid-row: ${order};
          grid-column: 2;
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
            grid-column: 2;
          }
        }

        @media only screen and (max-width: 600px) {
          .ph-inlist {
            grid-column: 1;
          }
        }
      `}</style>
    </>
  );
};
