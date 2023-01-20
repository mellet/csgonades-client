import { FC } from "react";
import { FaCrosshairs, FaEye, FaVideo } from "react-icons/fa";
import { BlogCopyPaste } from "../../../../blog/components/BlogCopyPaste";
import { Dimensions } from "../../../../constants/Constants";
import { Box } from "../../../../shared-components/box/Box";
import { SplitLayout } from "../../../../shared-components/box/SplitBox";
import { Seperator } from "../../../../shared-components/Seperator";
import { Title } from "../../../../shared-components/title/Title";
import { GfyInput } from "../../NadeInputs/GfyInput";
import { GfycatPreview } from "../GfycatPreview";
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
                  Record and upload your nade throw to{" "}
                  <a
                    href="https://gfycat.com/"
                    target="_blank"
                    rel="noreferrer"
                    style={{ color: "white" }}
                  >
                    gfycat
                  </a>
                  . Follow the requirements below to avoid getting your nade
                  declined.
                </p>
                <Rule icon={<FaVideo />}>Aspect ratio must be 16:9</Rule>
                <Rule icon={<FaCrosshairs />}>High visibility crosshair</Rule>
                <Rule icon={<FaEye />}>
                  Hide HUD and net graph. Use the below command to hide clutter.
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
                <GfyInput onChange={actions.setVideo} />
              </div>
              <div className="video-preview-section">
                <GfycatPreview gfycat={nade.gfycat} />
              </div>
            </div>
          }
        />
        <NextNavigation
          onNextStep={() => actions.setCurrentStep("info")}
          enabled={Boolean(nade.gfycat)}
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
