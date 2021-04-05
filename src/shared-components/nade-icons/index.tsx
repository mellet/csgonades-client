import { FC, memo } from "react";
import { NadeType } from "../../nade/models/NadeType";
import { SmokeIcon } from "./SmokeIcon";
import { FlashIcon } from "./FlashIcon";
import { MolotovIcon } from "./MolotovIcon";
import { HEIcon } from "./HEIcon";

type Props = {
  nadeType?: NadeType;
  size?: number;
  count?: number;
  isNew?: boolean;
};

export const NadeIcon: FC<Props> = memo(({ nadeType, size, count, isNew }) => {
  switch (nadeType) {
    case "smoke":
      return <SmokeIcon size={size} count={count} isNew={isNew} />;
    case "flash":
      return <FlashIcon size={size} count={count} isNew={isNew} />;
    case "molotov":
      return <MolotovIcon size={size} count={count} isNew={isNew} />;
    case "hegrenade":
      return <HEIcon size={size} count={count} isNew={isNew} />;
    default:
      return null;
  }
});
