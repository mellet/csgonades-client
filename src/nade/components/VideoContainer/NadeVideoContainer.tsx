import { FC, memo, useState } from "react";
import { GfycatIframe } from "./GfycatIframe";
import { NadeTabSelector } from "./NadeTabSelector";
import { NadeLineUpImage } from "./NadeLineupImage";
import { NadeMeta } from "../NadeMeta/NadeMeta";
import { Nade } from "../../models/Nade";
import { getNadeLineUpImage } from "../NadeItem/NadeItem";

type Props = {
  nade: Nade;
};

type Tabs = "video" | "lineup";

export const NadeVideoContainer: FC<Props> = memo(({ nade }) => {
  const [currentTab, setCurrentTab] = useState<Tabs>("video");

  const lineUpUrl = getNadeLineUpImage(nade);

  const hasLineUp = !!lineUpUrl;

  return (
    <>
      <NadeMeta
        movement={nade.movement}
        technique={nade.technique}
        tickrate={nade.tickrate}
        type={nade.type}
      />
      <div className="video-wrap">
        {hasLineUp && (
          <NadeTabSelector
            selectedTab={currentTab}
            onChangeTab={setCurrentTab}
          />
        )}

        <div className="media-container">
          {currentTab === "video" && (
            <div className="video-tab">
              <GfycatIframe gfyId={nade.gfycat.gfyId} />
            </div>
          )}

          {lineUpUrl && currentTab === "lineup" && (
            <NadeLineUpImage url={lineUpUrl} />
          )}
        </div>
      </div>
      <style jsx>{`
        .video-wrap {
          position: relative;
          overflow: hidden;
          padding-bottom: calc(56.25% + 44px);
        }

        .media-container {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
        }
      `}</style>
    </>
  );
});
