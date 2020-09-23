import { FC } from "react";
import { EzoicPlaceholder } from "../common/adunits/EzoicPlaceholder";
import { Dimensions } from "../constants/Constants";
import { Nade } from "../models/Nade/Nade";
import { generateTitle } from "../utils/Common";
import { NadeShareActions } from "./NadeShareActions";

type Props = {
  nade: Nade;
};

export const NadePageSidebar: FC<Props> = ({ nade }) => {
  return (
    <>
      <div id="nade-actions" className="stick-top">
        <div className="nade-action">
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
      </div>
      <div className="sidebar-ph">
        <EzoicPlaceholder id="170" />
      </div>

      <div className="sidebar-ph-small">
        <EzoicPlaceholder id="170" />
      </div>
      <style jsx>{`
        #nade-actions {
          margin-bottom: ${Dimensions.GUTTER_SIZE}px;
          width: calc(40px * 4);
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
