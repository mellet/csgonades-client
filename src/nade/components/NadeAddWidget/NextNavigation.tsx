import { FC } from "react";
import { FaChevronRight } from "react-icons/fa";
import { Dimensions } from "../../../constants/Constants";
import { Button } from "../../../shared-components/buttons/Button";

type Props = {
  onNextStep: () => void;
  enabled?: boolean;
};

export const NextNavigation: FC<Props> = ({ onNextStep, enabled }) => {
  function onClick() {
    window.scrollTo(0, 0);

    onNextStep();
  }

  return (
    <>
      <div className="button-container">
        <Button
          title="Next"
          onClick={onClick}
          disabled={!enabled}
          primary
          icon={<FaChevronRight size={12} />}
        />
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
