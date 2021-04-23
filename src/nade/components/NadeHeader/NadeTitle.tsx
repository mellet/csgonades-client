import { FC, memo } from "react";
import { useTheme } from "../../../core/settings/SettingsHooks";
import { Nade } from "../../models/Nade";
import { generateNadeItemTitle } from "../../../utils/Common";

type Props = {
  nade: Nade;
};

export const NadeTitle: FC<Props> = memo(({ nade }) => {
  const [title, subTitle] = generateNadeItemTitle(
    nade.startPosition,
    nade.endPosition,
    nade.type,
    nade.oneWay,
    nade.map
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
});
