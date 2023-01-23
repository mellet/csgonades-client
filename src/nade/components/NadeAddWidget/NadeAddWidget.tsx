import { FC } from "react";
import { AddNadeStepSwitcher } from "./NadeStepSwitcher";
import { CreateNadeProvider } from "./state/NadeAddStateProvider";

export const NadeAddWidget: FC = () => {
  return (
    <>
      <CreateNadeProvider>
        <AddNadeStepSwitcher />
      </CreateNadeProvider>
    </>
  );
};
