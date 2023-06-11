import { FC, memo } from "react";
import { useTheme } from "../../../core/settings/useTheme";
import { generateNadeItemTitle } from "../../../utils/Common";
import { NadeType } from "../../models/NadeType";
import { CsgoMap } from "../../../map/models/CsGoMap";
import { useIsDeviceSize } from "../../../core/layout/useDeviceSize";

type Props = {
  nadeStartPosition?: string;
  nadeEndPosition?: string;
  nadeType?: NadeType;
  isOneWay?: boolean;
  csGoMap?: CsgoMap;
};

export const NadeTitle: FC<Props> = memo(
  ({ csGoMap, isOneWay, nadeEndPosition, nadeStartPosition, nadeType }) => {
    const { isMobile } = useIsDeviceSize();
    const [title, subTitle] = generateNadeItemTitle(
      nadeStartPosition,
      nadeEndPosition,
      nadeType,
      isOneWay,
      csGoMap
    );

    const { colors } = useTheme();

    return (
      <>
        <h1>
          {title} {subTitle}
        </h1>

        <style jsx>{`
          h1 {
            font-size: ${isMobile ? "22px" : "28px"};
            margin: 0;
            padding: 0;
            font-weight: 300;
            color: ${colors.TEXT};
            text-align: ${isMobile ? "center" : "auto"};
          }
        `}</style>
      </>
    );
  }
);
