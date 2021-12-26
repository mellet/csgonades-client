import { FC } from "react";
import { useTheme } from "../../../../core/settings/SettingsHooks";
import { Dimensions } from "../../../../constants/Constants";
import { useFilterByType } from "../../../logic/useFilterByType";
import { nadeTypeString } from "../../../../nade/models/NadeType";
import { ContributorUser } from "./ContributorUser";
import { useNadeContributors } from "./useNadeContributors";
import { NadeLight } from "../../../../nade/models/Nade";

type ContListProps = {
  nades: NadeLight[];
};

export const TopContributorList: FC<ContListProps> = ({ nades }) => {
  const { byType } = useFilterByType();
  const { colors } = useTheme();
  const contributors = useNadeContributors(nades, 16);

  if (nades.length === 0) {
    return null;
  }

  return (
    <>
      <div className="cont-list">
        <div className="label">{nadeTypeString(byType)} Contributors</div>
        <div className="contributors">
          {contributors.map((c) => (
            <ContributorUser key={c.steamId} user={c} />
          ))}
        </div>
      </div>
      <style jsx>{`
        .cont-list {
          margin-top: ${Dimensions.GUTTER_SIZE}px;
          border-top: 1px solid ${colors.BORDER};
        }

        .label {
          color: ${colors.TEXT};
          padding: 16px 16px;
          padding-bottom: 8px;
          text-align: center;
          font-size: 16px;
        }

        .contributors {
          display: flex;
          flex-wrap: wrap;
          align-items: flex-start;
          margin-left: -2px;
          margin-right: -2px;
        }

        .cont-list span {
          font-size: 1.2em;
          margin-right: 8px;
          display: block;
          position: relative;
          top: 1px;
        }
      `}</style>
    </>
  );
};
