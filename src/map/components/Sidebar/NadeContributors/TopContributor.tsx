import { FC } from "react";
import { useTheme } from "../../../../core/settings/useTheme";
import { Dimensions } from "../../../../constants/Constants";
import { useFilterByType } from "../../../logic/useFilterByType";
import { nadeTypeString } from "../../../../nade/models/NadeType";
import { ContributorUser } from "./ContributorUser";
import { useNadeContributors } from "./useNadeContributors";
import { NadeLight } from "../../../../nade/models/Nade";
import { TopContributorLoading } from "./TopContributorLoading";

type ContListProps = {
  nades: NadeLight[];
  isLoading: boolean;
};

export const TopContributorList: FC<ContListProps> = ({ nades, isLoading }) => {
  const { byType } = useFilterByType();
  const { colors } = useTheme();
  const contributors = useNadeContributors(nades, 16);

  if (isLoading) {
    return <TopContributorLoading />;
  } else if (!isLoading && nades.length === 0) {
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
        .label {
          color: ${colors.TEXT};
          padding: 16px 0px;
          padding-bottom: 8px;
          font-size: 16px;
        }

        .contributors {
          display: flex;
          flex-wrap: wrap;
          align-items: flex-start;
          margin-left: -3px;
          margin-right: -3px;
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
