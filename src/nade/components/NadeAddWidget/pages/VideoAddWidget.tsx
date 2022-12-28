import { FC } from "react";
import { useTheme } from "../../../../core/settings/SettingsHooks";
import { Box } from "../../../../shared-components/box/Box";
import { GfycatData } from "../../../models/GfycatData";
import { GfyInput } from "../../NadeInputs/GfyInput";
import { GfycatPreview } from "../GfycatPreview";
import { NextNavigation } from "../NextNavigation";

type Props = {
  gfycat?: GfycatData;
  onSetVideo: (gfycatData: GfycatData) => void;
  onNextStep: () => void;
};

export const VideoAddWidget: FC<Props> = ({
  onSetVideo,
  gfycat,
  onNextStep,
}) => {
  const { colors } = useTheme();

  return (
    <>
      <Box>
        <div className="video-add-container">
          <div className="video-input-section">
            {" "}
            <GfyInput onChange={onSetVideo} />
          </div>
          <div className="video-preview-section">
            <GfycatPreview gfycat={gfycat} />
          </div>
        </div>
      </Box>
      <NextNavigation onNextStep={onNextStep} enabled={Boolean(gfycat)} />
      <style jsx>{`
        .video-add-container {
          display: flex;
        }

        .video-input-section {
          flex: 1;
          padding-right: 12px;
        }

        .video-preview-section {
          width: 60%;
          border-left: 1px dashed ${colors.BORDER};
          padding-left: 12px;
        }
      `}</style>
    </>
  );
};
