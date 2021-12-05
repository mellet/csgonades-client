import { FC } from "react";
import { DiscordJoinAction } from "../components/Sidebar/DiscordJoinAction";
import { NadeLight } from "../../nade/models/Nade";
import { CsgoMap } from "../models/CsGoMap";
import { Spacer } from "../../shared-components/Spacer";
import { Dimensions } from "../../constants/Constants";
import { BuyMeABeerAction } from "../components/Sidebar/BuyMeABeerAction";
import { SideJumbo } from "../components/Sidebar/SideJumbo";
import { AdUnitAdSense } from "../../shared-components/adunits/Adsense";

type Props = {
  map: CsgoMap;
  nades: NadeLight[];
};

export const MapSidebar: FC<Props> = ({ map, nades }) => {
  return (
    <>
      <Spacer vertical>
        <div className="ctas">
          <DiscordJoinAction />
          <BuyMeABeerAction />
        </div>

        <SideJumbo nades={nades} map={map} />
      </Spacer>
      <div className="ad">
        <AdUnitAdSense adFormat="fixed300" />
      </div>
      <style jsx>{`
        .ctas {
          border-radius: 8px;
          overflow: hidden;
        }

        .ad {
          position: sticky;
          top: ${Dimensions.HEADER_HEIGHT + Dimensions.GUTTER_SIZE}px;
          margin-top: ${Dimensions.GUTTER_SIZE}px;
          max-height: 300px;
        }
      `}</style>
    </>
  );
};
