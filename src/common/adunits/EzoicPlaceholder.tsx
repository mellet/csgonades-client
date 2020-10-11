import { FC, memo } from "react";
import { Dimensions } from "../../constants/Constants";
import { useTheme } from "../../store/SettingsStore/SettingsHooks";

type Props = {
  id: string;
};

export const EzoicPlaceholder: FC<Props> = memo(({ id }) => {
  const { colors } = useTheme();

  const ezoicId = `ezoic-pub-ad-placeholder-${id}`;
  return (
    <>
      <div className="ad-wrapper">
        <div className="ad-label">ADVERTISEMENT</div>
        <div className="ez" id={ezoicId} />
      </div>
      <style jsx>{`
        .ad-wrapper {
          background: ${colors.DP02};
          border-radius: ${Dimensions.BORDER_RADIUS};
          padding: 5px;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-around;
          flex-direction: column;
        }

        .ad-label {
          display: inline-block;
          font-size: 10px;
          font-weight: 400;
          width: 100%;
        }

        .ez {
        }
      `}</style>
    </>
  );
});
