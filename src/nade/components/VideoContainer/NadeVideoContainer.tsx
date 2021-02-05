import { FC, memo, useState } from "react";
import { GfycatIframe } from "./GfycatIframe";
import { NadeTabSelector } from "./NadeTabSelector";
import { NadeLineUpImage } from "./NadeLineupImage";
import { Dimensions } from "../../../constants/Constants";

type Props = {
  gfyId: string;
  lineUpUrl?: string;
};

type Tabs = "video" | "lineup";

export const NadeVideoContainer: FC<Props> = memo(({ gfyId, lineUpUrl }) => {
  const [currentTab, setCurrentTab] = useState<Tabs>("video");

  const hasLineUp = !!lineUpUrl;

  return (
    <>
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
              <GfycatIframe gfyId={gfyId} />
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
          padding-bottom: calc(56.25% + 34px);
          margin-left: ${Dimensions.GUTTER_SIZE}px;
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
