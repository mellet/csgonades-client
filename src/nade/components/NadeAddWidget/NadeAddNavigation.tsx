import { FC, useCallback } from "react";
import { FaChevronLeft } from "react-icons/fa";
import { Dimensions } from "../../../constants/Constants";
import { useTheme } from "../../../core/settings/SettingsHooks";
import { Link } from "../../../shared-components/link/Link";
import { NadeCreateSteps } from "./state/NadeAddState";

type Props = {
  currentStep: NadeCreateSteps;
  onSetCurrentStep: (step: NadeCreateSteps) => void;
};

export const NadeAddNavigation: FC<Props> = ({
  currentStep,
  onSetCurrentStep,
}) => {
  const { colors } = useTheme();

  const onBackClick = useCallback(() => {
    switch (currentStep) {
      case "mapStep":
        return onSetCurrentStep("typeStep");
      case "videoStep":
        return onSetCurrentStep("mapStep");
      default:
        break;
    }
  }, [currentStep, onSetCurrentStep]);

  return (
    <>
      <div className="nade-add-naviation">
        <Link icon={<FaChevronLeft />} title="Back" onClick={onBackClick} />
      </div>
      <style jsx>{`
        .nade-add-naviation {
          margin-bottom: ${Dimensions.GUTTER_SIZE}px;
        }

        .back-btn {
          border: none;
          cursor: pointer;
          color: ${colors.link};
          display: flex;
          margin: 0;
          padding: 0;
          font-size: 16px;
          line-height: 16px;
        }

        .back-btn span {
          margin-left: 6px;
        }

        .back-btn:hover {
          color: ${colors.linkHover};
        }
      `}</style>
    </>
  );
};
