import { FC, useEffect, useState, memo } from "react";
import { FaTimes } from "react-icons/fa";
import { useTheme } from "../../core/settings/SettingsHooks";
import { AppToast, ToastSeverity } from "../../core/toasts/ToastModels";
import { useToast } from "./useToast";

type Props = {
  notification: AppToast;
};

export const ToastItem: FC<Props> = memo(({ notification }) => {
  const { colors } = useTheme();
  const { removeToast } = useToast();
  const [fadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    const fadeOutTimer = setTimeout(() => {
      setIsFadingOut(true);
    }, notification.durationSeconds * 1000 - 500);
    return () => {
      clearTimeout(fadeOutTimer);
    };
  }, [notification]);

  function colorFromSeverity(severity: ToastSeverity) {
    switch (severity) {
      case "info":
        return colors.PRIMARY;
      case "error":
        return colors.ERROR;
      case "success":
        return colors.SUCCESS;
      case "warning":
        return colors.WARNING;
    }
  }

  const className = fadingOut
    ? "notification-item fade-out"
    : "notification-item";

  return (
    <>
      <div className={className}>
        {notification.title && (
          <div className="toast-title">
            {notification.title}
            <span
              className="toast-close-btn"
              onClick={() => removeToast(notification.id)}
            >
              <FaTimes />
            </span>
          </div>
        )}
        <div className="noti-msg">{notification.message}</div>
      </div>
      <style jsx>{`
        .notification-item {
          animation-duration: 1s;
          animation-fill-mode: forwards;
          animation-name: fadeIn;
          background: ${colors.DP02};
          border-radius: 5px;
          box-shadow: 0 0 3px rgba(0, 0, 0, 0.2);
          color: ${colors.TEXT};
          display: flex;
          display: inline-block;
          flex-direction: column;
          margin-bottom: 12px;
          opacity: 0;
          opacity: 1;
          overflow: hidden;
          padding-bottom: 5px;
          position: relative;
          transition: opacity 0.15s;
          width: 250px;
        }

        .toast-title {
          background: ${colors.DP01};
          color: ${colorFromSeverity(notification.severity)};
          display: flex;
          font-weight: 400;
          justify-content: space-between;
          padding: 8px 12px;
        }

        .toast-close-btn {
          color: #6c757d;
          cursor: pointer;
          transition: color 0.2s;
        }

        .toast-close-btn:hover {
          color: #222;
        }

        .noti-msg {
          padding: 8px 12px;
          white-space: pre-wrap;
        }

        .fade-out {
          opacity: 0;
          transform: scale(1, 0);
        }

        .noti-msg p {
          margin: 0;
          padding: 0;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </>
  );
});
