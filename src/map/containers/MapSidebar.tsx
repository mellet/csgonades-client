import { FC } from "react";
import { DiscordJoinAction } from "../components/Sidebar/DiscordJoinAction";
import { NadeLight } from "../../nade/models/NadeLight";
import { CsMap } from "../models/CsGoMap";
import { Spacer } from "../../shared-components/Spacer";
import { BuyMeABeerAction } from "../components/Sidebar/BuyMeABeerAction";
import { SideJumbo } from "../components/Sidebar/SideJumbo";
import { AdUnit } from "../../shared-components/adunits/AdUnit";

type Props = {
  map: CsMap;
  nades: NadeLight[];
  isLoading: boolean;
};

export const MapSidebar: FC<Props> = ({ map, nades, isLoading }) => {
  return (
    <>
      <Spacer vertical>
        <SideJumbo nades={nades} map={map} isLoading={isLoading} />
        <div className="ctas">
          <DiscordJoinAction />
          {false && <BuyMeABeerAction />}
        </div>
        <div className="ad">
          <AdUnit name="mapSidebarSquare" />
        </div>
      </Spacer>

      <style jsx>{`
        .ad {
          max-height: 300px;
        }
      `}</style>
    </>
  );
};
