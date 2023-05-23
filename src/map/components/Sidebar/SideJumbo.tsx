import dynamic from "next/dynamic";
import { FC } from "react";
import { useTheme } from "../../../core/settings/SettingsHooks";
import { NadeLight } from "../../../nade/models/Nade";
import { capitalize } from "../../../utils/Common";
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
};

export const SideJumbo: FC<Props> = ({ nades, map }) => {
  const { colors } = useTheme();

  return (
    <>
      <div className="jumbo">
        <h1>
          Uncover the Best Smokes, Flashbangs, Molotovs, and Grenades on{" "}
          {capitalize(map)} in Counter-Strike: Global Offensive.
        </h1>
        <h2>
          Prepare to dominate {capitalize(map)} with our meticulously crafted
          and carefully curated collection of smokes, flashbangs, molotovs, and
          grenades.
        </h2>
        <TopContributors nades={nades} />
      </div>
      <style jsx>{`
        .jumbo {
          padding: 16px;
          color: ${colors.TEXT};
          background: ${colors.DP03};
          border-radius: 8px;
        }

        .jumbo h1 {
          font-size: 18px;
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
