import { FC } from "react";
import { NadeStepSwitcher } from "./NadeStepSwitcher";
import { CreateNadeProvider } from "./state/NadeAddStateProvider";

export const NadeAddWidget: FC = () => {
  return (
    <>
      <CreateNadeProvider>
        <NadeStepSwitcher />
      </CreateNadeProvider>
    </>
  );
};
