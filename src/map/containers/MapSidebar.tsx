import { FC } from "react";
import { DiscordJoinAction } from "../components/Sidebar/DiscordJoinAction";
import { NadeLight } from "../../nade/models/Nade";
import { CsgoMap } from "../models/CsGoMap";
import { Spacer } from "../../shared-components/Spacer";
import { Dimensions } from "../../constants/Constants";
import { BuyMeABeerAction } from "../components/Sidebar/BuyMeABeerAction";
import { SideJumbo } from "../components/Sidebar/SideJumbo";
import { AdUnit } from "../../shared-components/adunits/AdUnit";

type Props = {
  map: CsgoMap;
  nades: NadeLight[];
};

export const MapSidebar: FC<Props> = ({ map, nades }) => {
  return (
    <>
      <div className="ad">
        <AdUnit name="mapSidebarSquare" />
      </div>
      <Spacer vertical>
        <SideJumbo nades={nades} map={map} />
        <div className="ctas">
          <DiscordJoinAction />
          {false && <BuyMeABeerAction />}
        </div>
      </Spacer>

      <style jsx>{`
        .ctas {
        }

        .ad {
          position: sticky;
          top: ${Dimensions.HEADER_HEIGHT + Dimensions.GUTTER_SIZE}px;
          margin-bottom: ${Dimensions.GUTTER_SIZE}px;
          max-height: 300px;
        }
      `}</style>
    </>
  );
};
