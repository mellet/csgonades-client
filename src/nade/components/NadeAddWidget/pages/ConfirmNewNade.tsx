import { FC } from "react";
import { Box } from "../../../../shared-components/box/Box";
import { SplitLayout } from "../../../../shared-components/box/SplitBox";
import { Title } from "../../../../shared-components/title/Title";
import { isValidNewNade } from "../../../../utils/NadeUtils";
import { PreviewNade } from "../../PreviewNades";
import { NadeAddStatusList } from "../NadeAddStatusList";
import { useCreateNade } from "../state/NadeAddStateProvider";

export const ConfirmNewNade: FC = () => {
  const { nade } = useCreateNade();

  return (
    <>
      <Box>
        <SplitLayout
          left={<NadeAddStatusList newNade={nade} />}
          right={
            <>
              <Title titleStyle="secondary" title="Preview" />
              <PreviewNade nade={nade} />
            </>
          }
        />
      </Box>
      <style jsx>{``}</style>
    </>
  );
};
