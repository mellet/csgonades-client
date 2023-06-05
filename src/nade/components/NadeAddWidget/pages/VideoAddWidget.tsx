import { FC } from "react";
import { FaCrosshairs, FaEye, FaVideo } from "react-icons/fa";
import { BlogCopyPaste } from "../../../../blog/components/BlogCopyPaste";
import { Dimensions } from "../../../../constants/Constants";
import { Box } from "../../../../shared-components/box/Box";
import { SplitLayout } from "../../../../shared-components/box/SplitBox";
import { Seperator } from "../../../../shared-components/Seperator";
import { Title } from "../../../../shared-components/title/Title";
import { VideoUrlInput } from "../../NadeInputs/VideoUrlInput";
import { VideoPreview } from "../VideoPreview";
import { HintBox } from "../HintBox";
import { NextNavigation } from "../NextNavigation";
import { Rule } from "../Rule";
import { useCreateNade } from "../state/NadeAddStateProvider";

export const VideoAddWidget: FC = () => {
  const { nade, actions } = useCreateNade();

  return (
    <>
      <Box>
        <Title titleStyle="primary" title="Video" />
        <Seperator />
        <SplitLayout
          right={
            <div className="gfycat-container">
              <HintBox title="Video requirements">
                <p>
                  To ensure your nade throw is accepted, please follow these
                  guidelines when recording and uploading your video to YouTube:
                </p>
                <Rule icon={<FaVideo />}>
                  <b>Aspect Ratio:</b> Make sure the video has an aspect ratio
                  of 16:9.
                </Rule>
                <Rule icon={<FaCrosshairs />}>
                  <b>High Visibility Crosshair:</b> Use a crosshair with
                  excellent visibility. We recommend using the crosshair
                  commonly used in CS:GO broadcasts.
                  <br />
                  <br />
                  <BlogCopyPaste value="CSGO-aNKFP-FzteR-6uRz5-4WP64-X6urD" />
                </Rule>
                <Rule icon={<FaEye />}>
                  <b>Hide In-Game HUD and Net Graph:</b> Remove any unnecessary
                  clutter by hiding the in-game HUD and net graph. You can
                  achieve this by using the command provided below:
                  <br />
                  <br />
                  <BlogCopyPaste value="cl_draw_only_deathnotices 1; net_graph 0;" />
                </Rule>
              </HintBox>
            </div>
          }
          left={
            <div className="gfycat-container">
              <div className="video-input-section">
                <VideoUrlInput onSetYouTubeId={actions.setYouTubeId} />
              </div>
              <div className="video-preview-section">
                <VideoPreview youTubeId={nade.youTubeId} />
              </div>
            </div>
          }
        />
        <NextNavigation
          onNextStep={() => actions.setCurrentStep("info")}
          enabled={Boolean(nade.youTubeId)}
        />
      </Box>

      <style jsx>{`
        .gfycat-container {
          display: flex;
          flex-direction: column;
          gap: ${Dimensions.GUTTER_SIZE}px;
        }

        .video-input-section {
          flex: 1;
        }
      `}</style>
    </>
  );
};
