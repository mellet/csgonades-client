import { FC, memo } from "react";
import { FaBell } from "react-icons/fa";
import { useNotifications } from "../data/NotificationHooks";
import { useTheme } from "../../core/settings/SettingsHooks";
import { SquareButton } from "../../shared-components/buttons/IconButton/SquareButton";
import Link from "next/link";

export const NotificationIndicator: FC = memo(() => {
  const { colors } = useTheme();
  const { notificationCount } = useNotifications();

  return (
    <>
      <div className="notification-wrapper">
        <Link href="/notifications" passHref>
          <SquareButton
            icon={<FaBell />}
            labelCount={notificationCount}
            activeColor={colors.SUCCESS}
          />
        </Link>
      </div>
      <style jsx>{`
        .notification-wrapper {
          align-items: center;
          display: flex;
          font-size: 0.9em;
        }
      `}</style>
    </>
  );
});
