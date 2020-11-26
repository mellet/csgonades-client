import { FC, useState } from "react";
import { Message, Step } from "semantic-ui-react";
import { useTheme } from "../store/SettingsStore/SettingsHooks";
import { AddGfycat } from "./AddGfycat";
import { Dimensions } from "../constants/Constants";

type NewNadeStep = "gfycat" | "result-img";

export const NewNadePage: FC = () => {
  const [currentStep, setCurrentStep] = useState<NewNadeStep>("gfycat");
  const { colors } = useTheme();
  const [error, setError] = useState<string | null>(null);

  function onGfycatAdded() {
    setCurrentStep("result-img");
  }

  function onGfyStepClick() {
    setCurrentStep("gfycat");
  }

  function onImgStepClick() {
    setCurrentStep("result-img");
  }

  return (
    <>
      <div className="nade-new-container">
        <Step.Group>
          <Step
            active={currentStep === "gfycat"}
            icon="video"
            link
            title="Video"
            description="Add gfycat video"
            onClick={onGfyStepClick}
          />
          <Step
            active={currentStep === "result-img"}
            icon="image"
            link
            title="Screenshot"
            description="Add a image of the resulting nade"
            onClick={onImgStepClick}
          />
        </Step.Group>

        {error && (
          <Message negative>
            <Message.Header>Error</Message.Header>
            <p>{error}</p>
          </Message>
        )}

        <div className="new-nade-step">
          {currentStep === "gfycat" && (
            <AddGfycat
              addGfycat={onGfycatAdded}
              onError={(e) => setError(e)}
              clearError={() => setError(null)}
            />
          )}
          {currentStep === "result-img" && <></>}
        </div>
      </div>

      <style jsx>
        {`
          .nade-new-container {
            grid-area: main;
            margin: ${Dimensions.GUTTER_SIZE}px;
          }

          .new-nade-step {
            border: 1px solid ${colors.BORDER};
            background: ${colors.DP01};
            border-radius: 4px;
            padding: 12px;
          }
        `}
      </style>
    </>
  );
};
