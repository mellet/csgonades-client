import { FC } from "react";
import { CsgoMap } from "../../../map/models/CsGoMap";
import { GfycatData } from "../../models/GfycatData";
import { MapCoordinates, NadeCreateBody } from "../../models/Nade";
import { NadeType } from "../../models/NadeType";
import { NadeStepIndicator } from "./NadeStepIndicator";
import { InfoAddWidget } from "./pages/InfoAddWidget";
import { MapAddWidget } from "./pages/MapAddWidget";
import { TypeAddWidget } from "./pages/TypeAddWidget";
import { VideoAddWidget } from "./pages/VideoAddWidget";
import { NadeCreateSteps } from "./state/NadeAddState";

type Props = {
  currentStep: NadeCreateSteps;
  nadeData: Partial<NadeCreateBody>;
  onSetType: (type: NadeType) => void;
  onSetMap: (map: CsgoMap) => void;
  onSetMapPosition: (position: MapCoordinates) => void;
  onSetVideo: (gfycat: GfycatData) => void;
  onSetCurrentStep: (step: NadeCreateSteps) => void;
};

export const NadeStepSwitcher: FC<Props> = ({
  currentStep,
  nadeData,
  onSetType,
  onSetMap,
  onSetMapPosition,
  onSetVideo,
  onSetCurrentStep,
}) => {
  const nadeStepComponent = () => {
    switch (currentStep) {
      case "typeStep":
        return (
          <TypeAddWidget
            onTypeSelect={onSetType}
            onSetMap={onSetMap}
            nadeType={nadeData.type}
            selectedMap={nadeData.map}
            onNextStep={() => onSetCurrentStep("mapStep")}
          />
        );
      case "mapStep":
        return nadeData.map ? (
          <MapAddWidget
            selectedMap={nadeData.map}
            onSetMapPosition={onSetMapPosition}
          />
        ) : (
          <></>
        );
      case "videoStep":
        return (
          <VideoAddWidget
            onSetVideo={onSetVideo}
            gfycat={nadeData.gfycat}
            onNextStep={() => onSetCurrentStep("metaStep")}
          />
        );
      case "metaStep":
        return <InfoAddWidget />;
      default:
        return <>Nope</>;
    }
  };

  return (
    <>
      <div className="nade-step-switcher-container">
        <NadeStepIndicator
          currentStep={currentStep}
          setCurrentStep={onSetCurrentStep}
        />
        {nadeStepComponent()}
      </div>
      <style jsx>{`
        .nade-step-switcher-container {
          margin: 0 auto;
          max-width: 75vw;
        }
      `}</style>
    </>
  );
};
