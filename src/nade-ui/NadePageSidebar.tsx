import { FC } from "react";
import { SidebarAdSticky } from "../common/adunits/SidebarAdSticky";
import { Nade } from "../nade-data/Nade/Nade";
import { generateTitle } from "../utils/Common";
import { NadeMeta } from "./components/NadeMeta";
import { NadeShareActions } from "./NadeShareActions";

type Props = {
  nade: Nade;
};

export const NadePageSidebar: FC<Props> = ({ nade }) => {
  return (
    <>
      <div id="nade-actions">
        <div id="meta">
          <NadeMeta
            type={nade.type}
            movement={nade.movement}
            technique={nade.technique}
            tickrate={nade.tickrate}
          />
        </div>

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

        <div className="sidebar-ph">
          <SidebarAdSticky />
        </div>
      </div>

      <style jsx>{`
        #meta {
        }

        .sidebar-ph {
          display: flex;
          align-items: center;
          justify-content: space-around;
        }
      `}</style>
    </>
  );
};
