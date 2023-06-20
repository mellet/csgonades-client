import { FC } from "react";
import { Button } from "../../../shared-components/buttons/Button";
import { Dimensions } from "../../../constants/Constants";

type Props = {
  onFinish: () => void;
};

export const EloGameFinishScreen: FC<Props> = ({ onFinish }) => {
  return (
    <>
      <div className="elo-end">
        <h3>Thanks for rating the nades! 🎉</h3>
        <p>
          Your valuable input has already begun to shape the hierarchy of these
          nades. As we sort the nades, the best performers will rise to the top,
          thanks again for your participation!
        </p>

        <p>
          <Button onClick={onFinish} title="Back to nades" />
        </p>
      </div>

      <style jsx>{`
        .elo-end {
          max-width: 500px;
          padding: ${Dimensions.GUTTER_SIZE}px;
        }
      `}</style>
    </>
  );
};
