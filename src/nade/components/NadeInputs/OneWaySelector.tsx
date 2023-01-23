import { FC, useState } from "react";
import { CsgnCheckbox } from "../../../shared-components/inputs/CsgnCheckbox";
import { MiniLabel } from "../NadeLabels/MiniLabel";

type Props = {
  initialValue?: boolean;
  onClick: (isOneWay: boolean) => void;
};

export const OneWaySelector: FC<Props> = ({ initialValue, onClick }) => {
  const [checked, setChecked] = useState(Boolean(initialValue));

  function onClicked() {
    setChecked(!checked);
    onClick(!checked);
  }

  return (
    <div className="one-way-container">
      <MiniLabel value="One Way" optional />
      <CsgnCheckbox checked={checked} label="Is One Way" onClick={onClicked} />
      <style jsx>{`
        .one-way-container {
          height: 66px;
        }
      `}</style>
    </div>
  );
};
