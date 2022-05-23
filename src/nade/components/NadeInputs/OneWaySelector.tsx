import { FC, useState } from "react";
import { CsgnCheckbox } from "../../../shared-components/inputs/CsgnCheckbox";
import { MiniLabel } from "../NadeLabels/MiniLabel";

type Props = {
  initialValue?: boolean;
  onClick: (isOneWay: boolean) => void;
};

export const OneWaySelector: FC<Props> = ({ initialValue, onClick }) => {
  const [checked, setChecked] = useState(initialValue);

  function onClicked() {
    setChecked(!checked);
    onClick(!checked);
  }

  return (
    <>
      <MiniLabel value="One Way" />
      <CsgnCheckbox checked={checked} label="Is One Way" onClick={onClicked} />
    </>
  );
};
