import { FC } from "react";
import { Nade } from "../../nade-data/Nade/Nade";
import { useTheme } from "../../store/SettingsStore/SettingsHooks";
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
          border-radius: 5px;
          overflow: hidden;
        }
      `}</style>
    </>
  );
};
