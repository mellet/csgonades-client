import { FC } from "react";
import { NadeLight } from "../../nade-data/Nade/Nade";

type Props = {
  suggestedNades: NadeLight[];
  onDismiss: () => void;
};

export const SuggestedNades: FC<Props> = ({}) => {
  return (
    <>
      <div></div>
      <style jsx>{``}</style>
    </>
  );
};
