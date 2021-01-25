import { FC } from "react";
import { SidebarAdSticky } from "../../shared-components/adunits/SidebarAdSticky";
import { Nade } from "../models/Nade";
import { generateTitle } from "../../utils/Common";
import { NadeMeta } from "./NadeMeta/NadeMeta";
import { NadeShareActions } from "./NadeShareActions";
import { NadeEditButton } from "./NadeEditButton";

type Props = {
  nade: Nade;
};

export const NadePageSidebar: FC<Props> = ({ nade }) => {
  return (
    <>
      <div id="nade-actions">
        <NadeEditButton nade={nade} />

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
