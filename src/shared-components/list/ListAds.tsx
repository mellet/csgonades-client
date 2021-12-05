import { FC, useEffect, useState } from "react";
import { Dimensions } from "../../constants/Constants";
import { useTheme } from "../../core/settings/SettingsHooks";
import { AdUnitAdSense } from "../adunits/Adsense";

type Props = {
  numNades: number;
};

export const ListAds: FC<Props> = () => {
  const [isAdBlockEnabled, setIsAdBlockEnabled] = useState(true);

  useEffect(() => {
    // @ts-ignore
    if (window.adsbygoogle && window.adsbygoogle.loaded) {
      console.log("> Adblock is disabled");
      setIsAdBlockEnabled(false);
    }
  }, []);

  /**
  const numberOfAds = useMemo(() => {
    const nadeCalc = Math.floor(numNades / 13) || 1;

    if (nadeCalc < 5) {
      return nadeCalc;
    }

    return 5;
  }, [numNades]);
   */

  // const ads = new Array(numberOfAds).fill(0);

  if (isAdBlockEnabled) {
    return null;
  }

  return <ListAdUnit key={`ad-${0}`} position={0} />;
};

type AdUnitProps = {
  position: number;
};

const ListAdUnit: FC<AdUnitProps> = ({ position }) => {
  const { colors } = useTheme();
  return (
    <>
      <div className="ph-inlist">
        <AdUnitAdSense adFormat="in-nade-list" />
      </div>
      <style jsx>{`
        .ph-inlist {
          align-items: center;
          display: flex;
          order: ${position};
          justify-content: center;
          background: ${colors.DP02};
          border-radius: ${Dimensions.BORDER_RADIUS};
          border: 1px solid ${colors.BORDER};
          height: 100%;
          overflow: hidden;
        }
      `}</style>
    </>
  );
};
