import Image from "next/image";
import { FC } from "react";
import { NadeType } from "../../../../nade/models/NadeType";
import { iconFromType } from "../../../../utils/Common";

type Props = {
  type: NadeType;
};

const ICON_SIZE = 26;
const ICON_QUALITY = 100;

export const TypeIcon: FC<Props> = ({ type }) => {
  const iconUrl = iconFromType(type);

  if (!iconUrl) {
    return null;
  }

  return (
    <>
      <Image
        priority
        src={iconUrl}
        width={ICON_SIZE}
        height={ICON_SIZE}
        quality={ICON_QUALITY}
      />
    </>
  );
};
