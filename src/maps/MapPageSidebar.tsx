import { FC } from "react";
import { DiscordJoinAction } from "../frontpage/DiscordJoinAction";
import { CsgoMap } from "../nade-data/Nade/CsGoMap";
import { NadeLight } from "../nade-data/Nade/Nade";
import { SidebarAdSticky } from "../common/adunits/SidebarAdSticky";
import { TopContributorsLazy } from "./components/TopContributors/TopContributorsLazy";
import { useTheme } from "../store/SettingsStore/SettingsHooks";
import { capitalize } from "../utils/Common";
import { PaypalAction } from "../frontpage/PaypalAction";

type Props = {
  map: CsgoMap;
  nades: NadeLight[];
};

export const MapPageSidebar: FC<Props> = ({ map, nades }) => {
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

        <div className="spacer"></div>

        <div className="discord">
          <DiscordJoinAction />
        </div>
        <div className="paypal">
          <PaypalAction />
        </div>
      </div>
      <style jsx>{`
        .mappage-sidebar {
          min-height: 100%;
          display: flex;
          flex-direction: column;
          overflow-y: auto;
          background: ${colors.DP02};
        }

        .jumbo {
          padding: 16px;
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

        .discord,
        .paypal {
          padding: 16px 16px 0px 16px;
        }

        .paypal {
          padding: 16px;
        }
      `}</style>
    </>
  );
};
