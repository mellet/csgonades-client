import { FC } from "react";
import { useTheme } from "styled-components";
import { NadeLight } from "../../../nade/models/Nade";
import { capitalize } from "../../../utils/Common";
import { CsgoMap } from "../../models/CsGoMap";
import { TopContributorsLazy } from "./TopContributorsLazy";

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
          Find the best smokes, flashbangs, molotovs and grenades for{" "}
          {capitalize(map)}.
        </h1>
        <h2>Don&apos;t be like BOT Bob, get some nades.</h2>

        <TopContributorsLazy nades={nades} />
      </div>
      <style jsx>{`
        .jumbo {
          padding: 16px;
          color: ${colors.TEXT};
          background: ${colors.DP03};
          border-radius: 8px;
        }

        .jumbo h1 {
          font-size: 20px;
          margin: 0;
          padding: 0;
          margin-bottom: 10px;
        }

        .jumbo h2 {
          font-size: 16px;
          margin: 0;
          padding: 0;
        }
      `}</style>
    </>
  );
};
