import { FC, memo, useEffect } from "react";
import { useSelector } from "react-redux";
import { Dimensions, LayerPosition } from "../../constants/Constants";
import { toastSelector } from "../../core/toasts/ToastSelectors";
import { ToastItem } from "./ToastItem";
import { useDisplayToast } from "../../core/toasts/hooks/useDisplayToast";

const DEBUG = false;

export const ToastList: FC = memo(() => {
  const displayToast = useDisplayToast();
  const toasts = useSelector(toastSelector);

  useEffect(() => {
    if (DEBUG) {
      setTimeout(() => {
        displayToast({
          severity: "error",
          message: "This is a error toast.",
        });
      }, 1000);
      setTimeout(() => {
        displayToast({
          severity: "success",
          message:
            "Your profile is ready! Btw, come join the rest of us on Discord 😎 You can find the link to join on the bottom of the website.",
          title: "All set!",
          durationSeconds: 20,
        });
      }, 2000);
      displayToast({
        severity: "info",
        message: "This is a info toast.",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="notification-container">
        {toasts.map((toast) => (
          <ToastItem key={toast.id} notification={toast} />
        ))}
      </div>
      <style jsx>{`
        .notification-container {
          align-items: flex-end;
          display: flex;
          flex-basis: fit-content;
          flex-direction: column;
          position: fixed;
          right: ${Dimensions.GUTTER_SIZE}px;
          top: ${Dimensions.HEADER_HEIGHT + Dimensions.GUTTER_SIZE}px;
          z-index: ${LayerPosition.MODAL};
        }
      `}</style>
    </>
  );
});
