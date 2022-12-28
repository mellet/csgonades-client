import { FC } from "react";
import { Dimensions } from "../../../constants/Constants";
import { Button } from "../../../shared-components/buttons/Button";

type Props = {
  onNextStep: () => void;
  enabled?: boolean;
};

export const NextNavigation: FC<Props> = ({ onNextStep, enabled }) => {
  return (
    <>
      <div className="button-container">
        <Button title="Next" onClick={onNextStep} disabled={!enabled} />
      </div>
      <style jsx>{`
        .button-container {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          margin-top: ${Dimensions.GUTTER_SIZE}px;
        }
      `}</style>
    </>
  );
};
