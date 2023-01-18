import { FC } from "react";
import { Box } from "../../../../shared-components/box/Box";
import { SplitLayout } from "../../../../shared-components/box/SplitBox";
import { Title } from "../../../../shared-components/title/Title";
import { isValidNewNade } from "../../../../utils/NadeUtils";
import { PreviewNade } from "../../PreviewNades";
import { useCreateNade } from "../state/NadeAddStateProvider";

export const ConfirmNewNade: FC = () => {
  const { nade } = useCreateNade();

  const isValidNade = isValidNewNade(nade);

  return (
    <>
      <Box>
        <SplitLayout
          left={<>Hello {isValidNade ? "ok" : "nope"}</>}
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
