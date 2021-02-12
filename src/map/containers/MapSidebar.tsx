import { FC } from "react";
import { DiscordJoinAction } from "../components/Sidebar/DiscordJoinAction";
import { NadeLight } from "../../nade/models/Nade";
import { SidebarAdSticky } from "../../shared-components/adunits/SidebarAdSticky";
import { TopContributorsLazy } from "../components/Sidebar/TopContributorsLazy";
import { useTheme } from "../../core/settings/SettingsHooks";
import { capitalize } from "../../utils/Common";
import { CsgoMap } from "../models/CsGoMap";
import { Spacer } from "../../shared-components/Spacer";
import { Dimensions } from "../../constants/Constants";

type Props = {
  map: CsgoMap;
  nades: NadeLight[];
};

export const MapSidebar: FC<Props> = ({ map, nades }) => {
  const { colors } = useTheme();

  return (
    <>
      <Spacer vertical>
        <div className="ctas">
          <div className="cta">
            <DiscordJoinAction />
          </div>
        </div>

        <div className="jumbo">
          <h1>
            Find the best smokes, flashbangs, molotovs and grenades for{" "}
            {capitalize(map)}.
          </h1>
          <h2>Don&apos;t be like BOT Bob, get some nades.</h2>

          <TopContributorsLazy nades={nades} />
        </div>
      </Spacer>
      <div className="ad">
        <SidebarAdSticky />
      </div>
      <style jsx>{`
        .mappage-sidebar {
          height: 100%;
        }

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
        .ctas {
          display: flex;
          flex-direction: column;
          border-radius: 8px;
          overflow: hidden;
        }

        .ad {
          position: sticky;
          top: ${Dimensions.HEADER_HEIGHT + Dimensions.GUTTER_SIZE}px;
          margin-top: ${Dimensions.GUTTER_SIZE}px;
        }
      `}</style>
    </>
  );
};
