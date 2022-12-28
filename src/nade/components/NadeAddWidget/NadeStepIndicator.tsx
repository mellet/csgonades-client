import { FC } from "react";
import { useTheme } from "../../../core/settings/SettingsHooks";
import { NadeCreateSteps } from "./state/NadeAddState";

type Props = {
  currentStep: NadeCreateSteps;
  setCurrentStep: (step: NadeCreateSteps) => void;
};

export const NadeStepIndicator: FC<Props> = ({
  currentStep,
  setCurrentStep,
}) => {
  return (
    <>
      <div className="container">
        <section className="step-indicator">
          <Step
            number={1}
            stepName={"Type"}
            active={currentStep === "typeStep"}
            onClick={() => setCurrentStep("typeStep")}
          />
          <Step
            number={2}
            stepName={"Map"}
            active={currentStep === "mapStep"}
            onClick={() => setCurrentStep("mapStep")}
          />
          <Step
            number={3}
            stepName={"Video"}
            active={currentStep === "videoStep"}
            onClick={() => setCurrentStep("videoStep")}
          />
          <Step
            number={4}
            stepName={"Info"}
            active={currentStep === "metaStep"}
            onClick={() => setCurrentStep("metaStep")}
          />
          <Step
            number={5}
            stepName={"Result image"}
            active={currentStep === "resultImgStep"}
            onClick={() => setCurrentStep("resultImgStep")}
          />
          <Step
            number={6}
            stepName={"Lineup image"}
            active={currentStep === "lineupImgStep"}
            onClick={() => setCurrentStep("lineupImgStep")}
          />
          <Step
            number={7}
            stepName={"Pro"}
            active={currentStep === "proStep"}
            onClick={() => setCurrentStep("proStep")}
          />
          <Step
            isLast
            number={8}
            stepName={"Confirm"}
            active={currentStep === "confirmStep"}
            onClick={() => setCurrentStep("confirmStep")}
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
  onClick: () => void;
};

const Step: FC<StepProps> = ({ stepName, isLast, active, number, onClick }) => {
  const { colors } = useTheme();

  return (
    <>
      <div className={active ? "step active" : "step"}>
        <button onClick={onClick} className="step-icon">
          {number}
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
          background: #c2c2c2;
          font-size: 8px;
          text-align: center;
          color: #ffffff;
          position: relative;
          line-height: 22px;
          font-size: 12px;
          font-weight: 500;
          cursor: pointer;
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
