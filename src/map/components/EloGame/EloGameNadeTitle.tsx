import { FC } from "react";
import { NadeLight } from "../../../nade/models/NadeLight";
import { generateNadeItemTitle } from "../../../utils/Common";
import { useTheme } from "../../../core/settings/useTheme";
import { Dimensions } from "../../../constants/Constants";

type Props = {
  nade: NadeLight;
};

export const EloGameNadeTitle: FC<Props> = ({ nade }) => {
  const { colors } = useTheme();
  return (
    <>
      <div>
        {generateNadeItemTitle(
          nade.startPosition,
          nade.endPosition,
          nade.type,
          nade.oneWay,
          nade.map
        )}
      </div>
      <style jsx>{`
        div {
          background: ${colors.DP02};
          font-size: 22px;
          padding: 10px 20px;
          border: 1px solid ${colors.BORDER};
          text-align: center;
          border-top-left-radius: ${Dimensions.BORDER_RADIUS};
          border-top-right-radius: ${Dimensions.BORDER_RADIUS};
        }
      `}</style>
    </>
  );
};
