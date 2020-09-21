import { FC } from "react";
import { isMobileOnly } from "react-device-detect";
import { useTheme } from "../../store/SettingsStore/SettingsHooks";
import { EzoicPlaceholder } from "../adunits/EzoicPlaceholder";

type Props = {
  numNades: number;
};

export const ListAds: FC<Props> = ({ numNades }) => {
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

  const numberOfAds = Math.floor(numNades / 13);

  const ads = new Array(numberOfAds).fill(0);

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
    const startRow = isMobileOnly ? 5 : 3;
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
