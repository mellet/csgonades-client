import { FC, useEffect, useMemo, useState } from "react";
import { Dimensions } from "../../constants/Constants";
import { EzoicPlaceholder } from "../adunits/EzoicPlaceholder";

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
    return null;
  }

  return (
    <>
      {ads.map((_, i) => {
        const adId = adIds[i] || null;
        if (adId) {
          return <ListAdUnit key={`ad-${i}`} adId={adId} position={i} />;
        } else {
          return null;
        }
      })}
    </>
  );
};

type AdUnitProps = {
  adId: string;
  position: number;
};

const ListAdUnit: FC<AdUnitProps> = ({ adId, position }) => {
  const order = useMemo(() => {
    return 5 + 5 * position;
  }, [position]);

  return (
    <>
      <div className="ph-inlist">
        <EzoicPlaceholder id={adId} />
      </div>
      <style jsx>{`
        .ph-inlist {
          align-items: center;
          display: flex;
          grid-column: 2;
          grid-row: ${order} / ${order + 1};
          justify-content: center;
          margin-bottom: ${Dimensions.GUTTER_SIZE}px;
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
