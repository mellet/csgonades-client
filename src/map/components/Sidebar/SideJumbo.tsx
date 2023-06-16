import dynamic from "next/dynamic";
import { FC } from "react";
import { useTheme } from "../../../core/settings/useTheme";
import { NadeLight } from "../../../nade/models/Nade";
import { capitalize, useGameString } from "../../../utils/Common";
import { CsgoMap } from "../../models/CsGoMap";

const TopContributors = dynamic(
  () =>
    import(
      /* webpackChunkName: "topcontributors" */ "./NadeContributors/TopContributor"
    ).then((mod) => mod.TopContributorList),
  { ssr: false }
);

type Props = {
  nades: NadeLight[];
  map: CsgoMap;
  isLoading: boolean;
};

export const SideJumbo: FC<Props> = ({ nades, map, isLoading }) => {
  const { colors } = useTheme();

  const { fullGameString } = useGameString();

  return (
    <>
      <div className="jumbo">
        <h1>
          Find the Best Smokes, Flashbangs, Molotovs, and Grenades on{" "}
          {capitalize(map)} in {fullGameString}.
        </h1>
        <h2>
          Dominate {capitalize(map)} with our collection of smokes, flashbangs,
          molotovs, and grenades.
        </h2>
        <TopContributors nades={nades} isLoading={isLoading} />
      </div>
      <style jsx>{`
        .jumbo {
          padding: 16px;
          color: ${colors.TEXT};
          background: ${colors.DP03};
          border-radius: 8px;
        }

        .jumbo h1 {
          font-size: 16px;
          margin: 0;
          padding: 0;
          margin-bottom: 10px;
        }

        .jumbo h2 {
          font-size: 14px;
          margin: 0;
          padding: 0;
        }
      `}</style>
    </>
  );
};
