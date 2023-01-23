import { FC } from "react";
import { BlogCopyPaste } from "../../../../blog/components/BlogCopyPaste";
import { Dimensions } from "../../../../constants/Constants";
import { Box } from "../../../../shared-components/box/Box";
import { Title } from "../../../../shared-components/title/Title";
import { ImageUploader } from "../../NadeInputs/ImageUploader/ImageUploader";
import { HintBox } from "../HintBox";
import { NextNavigation } from "../NextNavigation";
import { useCreateNade } from "../state/NadeAddStateProvider";

export const ResultImageWidget: FC = () => {
  const { actions, nade } = useCreateNade();

  return (
    <>
      <Box>
        <Title title="Result Image" titleStyle="primary" bottomSpacing />
        <HintBox style={{ marginBottom: Dimensions.GUTTER_SIZE }}>
          <p>
            Make sure to hide eveything when taking a screenshot. Use the
            following command:
          </p>
          <BlogCopyPaste value="cl_drawhud 0; r_drawviewmodel 0; net_graph 0;" />
        </HintBox>
        <ImageUploader
          previewImageUrl={nade.imageBase64}
          onImageCropped={actions.setResultImage}
        />
        <NextNavigation
          onNextStep={() => actions.setCurrentStep("lineupImage")}
          enabled={Boolean(nade.imageBase64)}
        />
      </Box>
      <style jsx>{``}</style>
    </>
  );
};
