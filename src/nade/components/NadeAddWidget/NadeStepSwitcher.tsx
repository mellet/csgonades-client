import { FC } from "react";
import { assertNever } from "../../../utils/Common";
import { NadeStepIndicator } from "./NadeStepIndicator";
import { ConfirmNewNade } from "./pages/ConfirmNewNade";
import { InfoAddWidget } from "./pages/InfoAddWidget";
import { LineUpImageWidget } from "./pages/LineUpImageWidget";
import { MapAddWidget } from "./pages/MapAddWidget";
import { ResultImageWidget } from "./pages/ResultImageWidget";
import { VideoAddWidget } from "./pages/VideoAddWidget";
import { useCreateNade } from "./state/NadeAddStateProvider";

export const AddNadeStepSwitcher: FC = () => {
  const { step, nade, actions } = useCreateNade();

  const nadeStepComponent = () => {
    switch (step) {
      case "video":
        return <VideoAddWidget />;
      case "info":
        return <InfoAddWidget />;
      case "map":
        return <MapAddWidget />;
      case "resultImage":
        return <ResultImageWidget />;
      case "lineupImage":
        return <LineUpImageWidget />;
      case "confirmStep":
        return <ConfirmNewNade />;
      default:
        assertNever(step);
    }
  };

  return (
    <>
      <div className="nade-step-switcher-container">
        <NadeStepIndicator
          currentStep={step}
          setCurrentStep={actions.setCurrentStep}
          nadeBody={nade}
        />
        {nadeStepComponent()}
      </div>
      <style jsx>{`
        .nade-step-switcher-container {
          margin: 0 auto;
          max-width: 75vw;
          margin-bottom: 10vh;
        }
      `}</style>
    </>
  );
};
