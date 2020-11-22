import { FC } from "react";
import { Dimensions } from "../constants/Constants";
import { DiscordJoinAction } from "../frontpage/DiscordJoinAction";
import { CsgoMap } from "../nade-data/Nade/CsGoMap";
import { NadeLight } from "../nade-data/Nade/Nade";
import { SidebarAdSticky } from "../common/adunits/SidebarAdSticky";
import { TopContributorList } from "./TopContributor";
import { SidebarSkyskraperAd } from "../common/adunits/SidebarSkyskraper";

type Props = {
  map: CsgoMap;
  nades: NadeLight[];
};

export const MapPageSidebar: FC<Props> = ({ map, nades }) => {
  return (
    <>
      <>
        <div className="ph spacer top">
          <SidebarSkyskraperAd />
        </div>

        <div className="spacer">
          <TopContributorList csMap={map} nades={nades} />
        </div>

        <div className="sticky">
          <div className="spacer">
            <DiscordJoinAction />
          </div>
          <div className="ph">
            <SidebarAdSticky />
          </div>
        </div>
      </>
      <style jsx>{`
        .top {
          margin-top: 100px;
        }

        .sticky {
          position: sticky;
          top: ${Dimensions.NAV_HEIGHT + Dimensions.GUTTER_SIZE}px;
        }

        .spacer {
          margin-bottom: ${Dimensions.GUTTER_SIZE}px;
        }

        .half-spacer {
          margin-bottom: ${Dimensions.GUTTER_SIZE / 2}px;
        }

        .ph {
        }
      `}</style>
    </>
  );
};
