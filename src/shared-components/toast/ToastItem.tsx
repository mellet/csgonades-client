import { FC, useEffect, useState, memo } from "react";
import { FaTimes } from "react-icons/fa";
import { useTheme } from "../../core/settings/useTheme";
import { AppToast, ToastSeverity } from "../../core/toasts/ToastModels";
import { useToast } from "./useToast";

type Props = {
  toast: AppToast;
};

export const ToastItem: FC<Props> = memo(({ toast }) => {
  const { colors } = useTheme();
  const { removeToast } = useToast();
  const [fadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    const fadeOutTimer = setTimeout(() => {
      setIsFadingOut(true);
    }, toast.durationSeconds * 1000);
    return () => {
      clearTimeout(fadeOutTimer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        {toast.title && (
          <div className="toast-title">
            {toast.title}
            <span
              className="toast-close-btn"
              onClick={() => removeToast(toast.id)}
            >
              <FaTimes />
            </span>
          </div>
        )}
        <div className="noti-msg">{toast.message}</div>
      </div>
      <style jsx>{`
        .notification-item {
          animation-duration: 0.5s;
          animation-fill-mode: forwards;
          animation-name: fadeIn;
          background: ${colors.DP02};
          border-radius: 5px;
          box-shadow: 0 0 3px rgba(0, 0, 0, 0.2);
          color: ${colors.TEXT};
          display: flex;
          display: inline-block;
          flex-direction: column;
          margin-top: 12px;
          opacity: 1;
          overflow: hidden;
          padding-bottom: 5px;
          position: relative;
          transition: all 0.3s;
          width: 250px;
        }

        .toast-title {
          background: ${colors.DP01};
          color: ${colorFromSeverity(toast.severity)};
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
