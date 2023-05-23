import { FC } from "react";
import { BlogCopyPaste } from "../../../../blog/components/BlogCopyPaste";
import { Dimensions } from "../../../../constants/Constants";
import { Box } from "../../../../shared-components/box/Box";
import { Title } from "../../../../shared-components/title/Title";
import { ImageUploader } from "../../NadeInputs/ImageUploader/ImageUploader";
import { HintBox } from "../HintBox";
import { NextNavigation } from "../NextNavigation";
import { useCreateNade } from "../state/NadeAddStateProvider";

export const LineUpImageWidget: FC = () => {
  const { actions, nade } = useCreateNade();

  return (
    <>
      <Box>
        <Title title="Lineup Image" titleStyle="primary" bottomSpacing />
        <HintBox style={{ marginBottom: Dimensions.GUTTER_SIZE }}>
          <p>
            When capturing a screenshot, it&apos;s essential to hide all
            unnecessary elements. Use the following command to achieve a clean
            and clutter-free screenshot:
          </p>
          <BlogCopyPaste value="cl_drawhud 0; r_drawviewmodel 0; net_graph 0;" />
        </HintBox>
        <ImageUploader
          previewImageUrl={nade.lineUpImageBase64}
          onImageCropped={actions.setLineUpImage}
          showCrosshair
        />
        <NextNavigation
          onNextStep={() => actions.setCurrentStep("confirmStep")}
          enabled={Boolean(nade.lineUpImageBase64)}
        />
      </Box>
      <style jsx>{``}</style>
    </>
  );
};
