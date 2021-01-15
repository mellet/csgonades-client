import { FC, useState } from "react";
import { Checkbox } from "semantic-ui-react";
import { MiniLabel } from "../NadeLabels/MiniLabel";

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
      <Checkbox label="Is Pro" checked={checked} onClick={onClicked} />
      <style jsx>{``}</style>
    </>
  );
};
