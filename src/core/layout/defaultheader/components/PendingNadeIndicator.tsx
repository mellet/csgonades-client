import { FC } from "react";
import { FaBox } from "react-icons/fa";
import { useAdminPendingNades } from "../../../../admin/data/hooks/useAdminPendingNades";
import { SquareButton } from "../../../../shared-components/buttons/IconButton/IconButton";
import { useTheme } from "../../../settings/SettingsHooks";
import Link from "next/link";
import { Dimensions } from "../../../../constants/Constants";

export const PendingNadeIndicator: FC = ({}) => {
  const { pendingNades } = useAdminPendingNades();
  const { colors } = useTheme();

  return (
    <>
      <div className="pending-nade-indicator">
        <Link href="/admin/pending" passHref>
          <SquareButton
            icon={<FaBox />}
            labelCount={pendingNades.length}
            activeColor={colors.link}
          />
        </Link>
      </div>
      <style jsx>{`
        .pending-nade-indicator {
          margin-right: ${Dimensions.GUTTER_SIZE}px;
        }
      `}</style>
    </>
  );
};
