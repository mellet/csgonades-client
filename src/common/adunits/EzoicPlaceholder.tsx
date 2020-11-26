import { FC, memo } from "react";
import { Dimensions } from "../../constants/Constants";
import { useTheme } from "../../store/SettingsStore/SettingsHooks";

type Props = {
  id: string;
  disableAdLabel?: boolean;
};

export const EzoicPlaceholder: FC<Props> = memo(({ id, disableAdLabel }) => {
  const { colors } = useTheme();

  const ezoicId = `ezoic-pub-ad-placeholder-${id}`;
  return (
    <>
      <div className="ad-center">
        <div className="ad-wrapper">
          {!disableAdLabel && <div className="ad-label">ADVERTISEMENT</div>}
          <div className="ez" id={ezoicId} />
        </div>
      </div>
      <style jsx>{`
        .ad-center {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-around;
        }

        .ad-wrapper {
          background: ${colors.DP03};
          border-top-left-radius: ${Dimensions.BORDER_RADIUS};
          border-top-right-radius: ${Dimensions.BORDER_RADIUS};
          display: flex;
          align-items: center;
          justify-content: space-around;
          flex-direction: column;
          overflow: hidden;
        }

        .ad-label {
          font-size: 10px;
          font-weight: 400;
          width: 100%;
          text-align: center;
          padding: 2px;
          margin: 0px;
          background: ${colors.DP02};
          color: ${colors.TEXT};
        }

        .ez {
        }
      `}</style>
    </>
  );
});
