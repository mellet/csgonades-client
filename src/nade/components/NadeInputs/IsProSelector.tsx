import { FC, useState } from "react";
import { MiniLabel } from "../NadeLabels/MiniLabel";
import { CsgnCheckbox } from "../../../shared-components/inputs/CsgnCheckbox";

type Props = {
  initialValue?: boolean;
  onClick: (isPro: boolean) => void;
};

export const IsProSelector: FC<Props> = ({ initialValue, onClick }) => {
  const [checked, setChecked] = useState(initialValue);

  function onClicked() {
    setChecked(!checked);
    onClick(!checked);
  }

  return (
    <>
      <MiniLabel value="Verified Pro" />
      <CsgnCheckbox checked={checked} label="Is pro" onClick={onClicked} />
    </>
  );
};
