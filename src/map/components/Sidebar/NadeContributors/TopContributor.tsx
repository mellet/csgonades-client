import { FC } from "react";
import { useTheme } from "../../../../core/settings/useTheme";
import { ContributorUser } from "./ContributorUser";
import { TopContributorLoading } from "./TopContributorLoading";
import { useMapContributors } from "./useMapContributors";
import { CsMap } from "../../../models/CsGoMap";

type ContListProps = {
  csMap: CsMap;
};

export const TopContributorList: FC<ContListProps> = ({ csMap }) => {
  const { colors } = useTheme();

  const { contributors, isLoading } = useMapContributors(csMap);

  if (isLoading) {
    return <TopContributorLoading />;
  }

  return (
    <>
      <div className="cont-list">
        <div className="label">Nade Contributors</div>
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
