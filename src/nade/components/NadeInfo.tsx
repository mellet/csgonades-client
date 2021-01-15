import { FC } from "react";
import { Nade } from "../models/Nade";
import { useTheme } from "../../core/settings/SettingsHooks";
import { NadeDescriptionDisplay } from "./NadeDescriptionDisplay";
import { NadeDetails } from "./NadeDetails";

type Props = {
  nade: Nade;
};

export const NadeInfo: FC<Props> = ({ nade }) => {
  const { colors } = useTheme();

  return (
    <>
      <div className="nade-info">
        <NadeDetails nade={nade} />
        <div className="nade-desc-meta">
          <NadeDescriptionDisplay value={nade.description} />
        </div>
      </div>
      <style jsx>{`
        .nade-info {
          background: ${colors.DP03};
          border-bottom: 1px solid ${colors.BORDER};
        }
      `}</style>
    </>
  );
};
