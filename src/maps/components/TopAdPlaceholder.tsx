import { FC } from "react";
import { EzoicPlaceholder } from "../../common/adunits/EzoicPlaceholder";
import { PageCentralize } from "../../common/PageCentralize";
import { Dimensions } from "../../constants/Constants";
import { useTheme } from "../../store/SettingsStore/SettingsHooks";

export const TopAdPlaceholder: FC = () => {
  const { colors } = useTheme();

  return (
    <>
      <PageCentralize>
        <div className="ph-top">
          <EzoicPlaceholder id="175" />
        </div>
      </PageCentralize>
      <style jsx>{`
        .ph-top {
          display: flex;
          justify-content: space-around;
          align-items: center;
          margin-top: ${Dimensions.GUTTER_SIZE / 2}px;
          min-height: 90px;
          background: ${colors.DP01};
          border-radius: 5px;
        }
      `}</style>
    </>
  );
};
