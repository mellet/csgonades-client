import { FC, memo, useEffect } from "react";
import { Dimensions, LayerPosition } from "../../constants/Constants";
import { ToastItem } from "./ToastItem";
import { useDisplayToast } from "../../core/toasts/hooks/useDisplayToast";
import { useToast } from "./ToastContext";

const DEBUG = false;

export const ToastList: FC = memo(() => {
  const { toasts } = useToast();
  const displayToast = useDisplayToast();

  useEffect(() => {
    if (DEBUG) {
      setTimeout(() => {
        displayToast({
          severity: "success",
          message:
            "Your profile is ready! Btw, come join the rest of us on Discord 😎 You can find the link to join on the bottom of the website.",
          title: "All set!",
          durationSeconds: 10,
        });
      }, 3000);
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
          <ToastItem key={toast.id} toast={toast} />
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
          bottom: ${Dimensions.GUTTER_SIZE}px;
          z-index: ${LayerPosition.MODAL};
        }
      `}</style>
    </>
  );
});
