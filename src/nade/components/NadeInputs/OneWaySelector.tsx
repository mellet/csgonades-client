import { FC, useState } from "react";
import { Checkbox } from "semantic-ui-react";
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
      <Checkbox label="Is One Way" checked={checked} onClick={onClicked} />
    </>
  );
};
