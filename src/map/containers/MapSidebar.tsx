import { FC } from "react";
import { DiscordJoinAction } from "../components/Sidebar/DiscordJoinAction";
import { NadeLight } from "../../nade/models/Nade";
import { SidebarAdSticky } from "../../shared-components/adunits/SidebarAdSticky";
import { TopContributorsLazy } from "../components/Sidebar/TopContributorsLazy";
import { useTheme } from "../../core/settings/SettingsHooks";
import { capitalize } from "../../utils/Common";
import { PaypalAction } from "../components/Sidebar/PaypalAction";
import { CsgoMap } from "../models/CsGoMap";

type Props = {
  map: CsgoMap;
  nades: NadeLight[];
};

export const MapSidebar: FC<Props> = ({ map, nades }) => {
  const { colors } = useTheme();

  return (
    <>
      <div className="mappage-sidebar">
        <div className="jumbo">
          <h1>
            Find the best smokes, flashbangs, molotovs and grenades for{" "}
            {capitalize(map)}.
          </h1>
          <h2>Don&apos;t be like BOT Bob, get some nades.</h2>
        </div>

        <div className="ph">
          <SidebarAdSticky />
        </div>

        <div className="contributors">
          <TopContributorsLazy csMap={map} nades={nades} />
        </div>

        <div className="ctas">
          <div className="cta">
            <DiscordJoinAction />
          </div>
          <div className="cta">
            <PaypalAction />
          </div>
        </div>
      </div>
      <style jsx>{`
        .mappage-sidebar {
          min-height: 100%;
          display: flex;
          flex-direction: column;
          width: 300px;
        }

        .jumbo {
          padding: 16px;
          color: ${colors.TEXT};
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

        .spacer {
          flex: 1;
        }

        .ph {
          border-top: 1px solid ${colors.BORDER};
        }

        .ctas {
          display: flex;
          flex-direction: column;
        }

        .cta {
        }
      `}</style>
    </>
  );
};
