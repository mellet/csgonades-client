import { FC, memo } from "react";
import { useTheme } from "../../../core/settings/SettingsHooks";
import { generateNadeItemTitle } from "../../../utils/Common";
import { NadeType } from "../../models/NadeType";
import { CsgoMap } from "../../../map/models/CsGoMap";

type Props = {
  nadeStartPosition?: string;
  nadeEndPosition?: string;
  nadeType?: NadeType;
  isOneWay?: boolean;
  csGoMap?: CsgoMap;
};

export const NadeTitle: FC<Props> = memo(
  ({ csGoMap, isOneWay, nadeEndPosition, nadeStartPosition, nadeType }) => {
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
            font-size: 28px;
            margin: 0;
            padding: 0;
            font-weight: 300;
            color: ${colors.TEXT};
          }

          @media only screen and (max-width: 800px) {
            h1 {
              font-size: 24px;
            }
          }
        `}</style>
      </>
    );
  }
);
