import { FC } from "react";
import { FaCheck } from "react-icons/fa";
import { useTheme } from "../../../core/settings/SettingsHooks";
import { NadeCreateBody } from "../../models/Nade";
import { NadeCreateSteps } from "./state/NadeAddState";

type Props = {
  currentStep: NadeCreateSteps;
  setCurrentStep: (step: NadeCreateSteps) => void;
  nadeBody: Partial<NadeCreateBody>;
};

export const NadeStepIndicator: FC<Props> = ({
  currentStep,
  setCurrentStep,
  nadeBody,
}) => {
  const videoDone = isValidVideo(nadeBody);
  const infoDone = isValidInfo(nadeBody);
  const mapDone = isValidMap(nadeBody);
  const imageDone = Boolean(nadeBody.imageBase64);
  const lineupImageDone = Boolean(nadeBody.lineUpImageBase64);
  const allDone =
    videoDone && infoDone && mapDone && imageDone && lineupImageDone;

  return (
    <>
      <div className="container">
        <section className="step-indicator">
          <Step
            number={1}
            stepName={"Video"}
            active={currentStep === "video"}
            onClick={() => setCurrentStep("video")}
            isDone={videoDone}
          />
          <Step
            number={2}
            stepName={"Info"}
            active={currentStep === "info"}
            onClick={() => setCurrentStep("info")}
            isDone={infoDone}
            disabled={!videoDone}
          />
          <Step
            number={3}
            stepName={"Map"}
            active={currentStep === "map"}
            onClick={() => setCurrentStep("map")}
            isDone={mapDone}
            disabled={!infoDone}
          />
          <Step
            number={4}
            stepName={"Result image"}
            active={currentStep === "resultImage"}
            onClick={() => setCurrentStep("resultImage")}
            isDone={imageDone}
            disabled={!mapDone}
          />
          <Step
            number={5}
            stepName={"Lineup image"}
            active={currentStep === "lineupImage"}
            onClick={() => setCurrentStep("lineupImage")}
            isDone={lineupImageDone}
            disabled={!imageDone}
          />
          <Step
            isLast
            number={6}
            stepName={"Confirm"}
            active={currentStep === "confirmStep"}
            onClick={() => setCurrentStep("confirmStep")}
            disabled={!allDone}
          />
        </section>
      </div>
      <style jsx>{`
        .container {
          width: 75%;
          margin: 0 auto;
          padding-bottom: 40px;
        }

        .step-indicator {
          display: flex;
          align-items: center;
        }
      `}</style>
    </>
  );
};

type StepProps = {
  active?: boolean;
  stepName: string;
  number: number;
  isLast?: boolean;
  onClick?: () => void;
  isDone?: boolean;
  disabled?: boolean;
};

const Step: FC<StepProps> = ({
  stepName,
  isLast,
  active,
  number,
  onClick,
  isDone,
  disabled,
}) => {
  const { colors } = useTheme();

  return (
    <>
      <div className={active ? "step active" : "step"}>
        <button onClick={onClick} className="step-icon" disabled={disabled}>
          {isDone && !active ? (
            <FaCheck style={{ position: "relative", top: 2 }} />
          ) : (
            number
          )}
        </button>
        <p>{stepName}</p>
      </div>
      {!isLast && <div className={"indicator-line"}></div>}
      <style jsx>{`
        .step {
          display: flex;
          align-items: center;
          flex-direction: column;
          position: relative;
          z-index: 1;
        }

        .step-icon {
          height: 24px;
          width: 24px;
          border: none;
          border-radius: 50%;
          background: ${isDone ? colors.SUCCESS : "#c2c2c2"};
          font-size: 8px;
          text-align: center;
          color: #ffffff;
          position: relative;
          line-height: 22px;
          font-size: 12px;
          font-weight: 500;
          cursor: pointer;
        }

        .step-icon:disabled {
          cursor: not-allowed;
        }

        .step.active .step-icon {
          background: ${colors.filterBgHover};
        }

        .step p {
          text-align: center;
          position: absolute;
          bottom: -18px;
          color: #c2c2c2;
          font-size: 10px;
          font-weight: bold;
          white-space: nowrap;
        }

        .step.active p {
          color: ${colors.filterBgHover};
        }

        .indicator-line {
          width: 100%;
          height: 2px;
          background: #c2c2c2;
          flex: 1;
        }

        .indicator-line.active {
          background: ${colors.filterBgHover};
        }
      `}</style>
    </>
  );
};

const isValidVideo = (newNade: Partial<NadeCreateBody>) => {
  return Boolean(newNade.gfycat);
};

const isValidInfo = (newNade: Partial<NadeCreateBody>) => {
  const {
    description,
    endPosition,
    map,
    movement,
    startPosition,
    technique,
    type,
    teamSide,
  } = newNade;

  if (
    !description ||
    !endPosition ||
    !map ||
    !movement ||
    !startPosition ||
    !technique ||
    !type ||
    !teamSide
  ) {
    return false;
  }

  return true;
};

const isValidMap = (newNade: Partial<NadeCreateBody>) => {
  return Boolean(newNade.mapEndCoord);
};
