import { FC } from "react";
import { NadeType } from "../../nade/models/NadeType";
import { SmokeIcon } from "./SmokeIcon";
import { FlashIcon } from "./FlashIcon";
import { MolotovIcon } from "./MolotovIcon";
import { HEIcon } from "./HEIcon";

type Props = {
  nadeType: NadeType;
  size?: number;
};

export const NadeIcon: FC<Props> = ({ nadeType, size }) => {
  switch (nadeType) {
    case "smoke":
      return <SmokeIcon size={size} />;
    case "flash":
      return <FlashIcon size={size} />;
    case "molotov":
      return <MolotovIcon size={size} />;
    case "hegrenade":
      return <HEIcon size={size} />;
    default:
      return null;
  }
};
