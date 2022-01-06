import { FC } from "react";
import { Nade } from "../models/Nade";
import { useTheme } from "../../core/settings/SettingsHooks";
import { NadeDescriptionDisplay } from "./NadeDescriptionDisplay";
import { AdUnit } from "../../shared-components/adunits/AdUnit";
import { useIsDeviceSize } from "../../core/layout/useDeviceSize";

type Props = {
  nade: Nade;
};

export const NadeDescription: FC<Props> = ({ nade }) => {
  const { colors } = useTheme();
  const displayAd = useDisplayDescriptionAd(nade.commentCount);

  return (
    <>
      <div className="nade-info">
        <h3>Description</h3>
        <div className="nade-desc-meta">
          <NadeDescriptionDisplay value={nade.description} />
        </div>
      </div>
      {displayAd && <AdUnit name="nadeComment" horizontalSpacing />}

      <style jsx>{`
        .nade-info {
          border: 1px solid ${colors.BORDER};
          background: ${colors.DP03};
          border-radius: 8px;
          overflow: hidden;
          color: ${colors.TEXT};
        }

        h3 {
          font-size: 18px;
          border-bottom: 1px solid ${colors.BORDER};
          margin: 16px;
          margin-bottom: 0;
          padding-bottom: 16px;
          font-weight: 400;
        }

        .nade-desc-meta {
          margin: 16px;
        }

        .advert-desc {
          width: 100%;
          overflow: hidden;
          max-height: 90px;
        }
      `}</style>
    </>
  );
};

function useDisplayDescriptionAd(commentCount: number) {
  const { isMobile } = useIsDeviceSize();

  const hasComments = commentCount > 0;

  return isMobile || hasComments;
}
