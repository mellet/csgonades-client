import { FC } from "react";
import { FaPlus } from "react-icons/fa";
import { useAdminPendingNades } from "../../../admin/data/hooks/useAdminPendingNades";
import { Dimensions } from "../../../constants/Constants";
import { SquareButton } from "../../../shared-components/buttons/IconButton/IconButton";
import { useTheme } from "../../settings/SettingsHooks";

export const AdminNavContent: FC = ({}) => {
  const { colors } = useTheme();
  const { pendingNades } = useAdminPendingNades();

  if (!pendingNades.length) {
    return null;
  }

  return (
    <>
      <div className="new-pending-nade">
        <SquareButton
          icon={<FaPlus />}
          labelCount={pendingNades.length}
          activeColor={colors.PRIMARY}
        />
      </div>
      <style jsx>{`
        .new-pending-nade {
          margin-right: ${Dimensions.GUTTER_SIZE}px;
        }
      `}</style>
    </>
  );
};
