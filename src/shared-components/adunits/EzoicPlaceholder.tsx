import { FC, memo } from "react";
import { Dimensions } from "../../constants/Constants";
import { useTheme } from "../../core/settings/SettingsHooks";

type Props = {
  disableAdLabel?: boolean;
  id: string;
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
          align-items: center;
          display: flex;
          justify-content: space-around;
          width: 100%;
        }

        .ad-wrapper {
          align-items: center;
          background: ${colors.DP03};
          border-top-left-radius: ${Dimensions.BORDER_RADIUS};
          border-top-right-radius: ${Dimensions.BORDER_RADIUS};
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          overflow: hidden;
        }

        .ad-label {
          background: ${colors.DP02};
          color: ${colors.TEXT};
          font-size: 10px;
          font-weight: 400;
          margin: 0px;
          padding: 2px;
          text-align: center;
          width: 100%;
        }
      `}</style>
    </>
  );
});
