import { FC, memo } from "react";
import { NadeType } from "../../nade/models/NadeType";
import { SmokeIcon } from "./SmokeIcon";
import { FlashIcon } from "./FlashIcon";
import { MolotovIcon } from "./MolotovIcon";
import { MolotovIconStatic } from "./MolotovIconStatic";
import { HEIcon } from "./HEIcon";
import { HEIconStatic } from "./HEIconStatic";
import { FlashIconStatic } from "./FlashIconStatic";
import { NadeSpecificIconProps } from "./shared/NadeIconProps";
import { SmokeIconStatic } from "./SmokeIconStatic";

export type NadeIconProps = {
  nadeType?: NadeType;
  size?: number;
  count?: number;
  isNew?: boolean;
  animated?: boolean;
};

export const NadeIcon: FC<NadeIconProps> = memo(
  ({ nadeType, size, count, isNew, animated }) => {
    const props: NadeSpecificIconProps = {
      count,
      size,
      isNew,
    };

    switch (nadeType) {
      case "smoke":
        return animated ? (
          <SmokeIcon {...props} />
        ) : (
          <SmokeIconStatic {...props} />
        );
      case "flash":
        return animated ? (
          <FlashIcon {...props} />
        ) : (
          <FlashIconStatic {...props} />
        );
      case "molotov":
        return animated ? (
          <MolotovIcon {...props} />
        ) : (
          <MolotovIconStatic {...props} />
        );
      case "hegrenade":
        return animated ? <HEIcon {...props} /> : <HEIconStatic {...props} />;
      default:
        return null;
    }
  }
);
