import { FC } from "react";
import { EzoicPlaceholder } from "../common/adunits/EzoicPlaceholder";
import { Dimensions } from "../constants/Constants";
import { Nade } from "../models/Nade/Nade";
import { generateTitle } from "../utils/Common";
import { NadeMeta } from "./components/NadeMeta";
import { NadeShareActions } from "./NadeShareActions";

type Props = {
  nade: Nade;
};

export const NadePageSidebar: FC<Props> = ({ nade }) => {
  return (
    <>
      <div id="meta">
        <NadeMeta
          type={nade.type}
          movement={nade.movement}
          technique={nade.technique}
          tickrate={nade.tickrate}
          rounded
        />
      </div>

      <div id="nade-actions">
        <NadeShareActions
          title={generateTitle(
            nade.title,
            nade.startPosition,
            nade.endPosition,
            nade.type,
            nade.oneWay
          )}
          visisble={nade.status === "accepted"}
          url={`/nades/${nade?.slug || nade?.id}`}
          image={nade.images.thumbnailUrl}
        />
      </div>

      <div className="sidebar-ph">
        <EzoicPlaceholder id="170" />
      </div>

      <style jsx>{`
        #nade-actions,
        #meta {
          margin-bottom: ${Dimensions.GUTTER_SIZE}px;
        }

        .sidebar-ph {
          margin-bottom: ${Dimensions.GUTTER_SIZE}px;
        }

        .sidebar-ph-small {
          margin-bottom: ${Dimensions.GUTTER_SIZE}px;
        }
      `}</style>
    </>
  );
};
