import { FC } from "react";
import { NadeStepSwitcher } from "./NadeStepSwitcher";
import { useNadeAddWidgetState } from "./state/useNadeAddWidgetState";

export const NadeAddWidget: FC = () => {
  const {
    nadeAddState,
    setNadeType,
    setNadeMap,
    setMapPosition,
    setVideo,
    setCurrentStep,
  } = useNadeAddWidgetState();

  return (
    <>
      <div>
        <NadeStepSwitcher
          currentStep={nadeAddState.currentStep}
          nadeData={nadeAddState.nadeData}
          onSetType={setNadeType}
          onSetMap={setNadeMap}
          onSetMapPosition={setMapPosition}
          onSetVideo={setVideo}
          onSetCurrentStep={setCurrentStep}
        />
      </div>
      <style jsx>{``}</style>
    </>
  );
};
