import { useLocalStorage } from "usehooks-ts";
import { AppToast } from "../../core/toasts/ToastModels";
import { useCallback } from "react";

export const useToast = () => {
  const [toasts, setToasts] = useLocalStorage<AppToast[]>("toasts", []);

  const addToast = useCallback(
    (toast: AppToast) => {
      setToasts((currentToasts) => [...currentToasts, toast]);
    },
    [setToasts]
  );

  const removeToast = useCallback(
    (id: string) => {
      setToasts((currentToasts) => currentToasts.filter((t) => t.id !== id));
    },
    [setToasts]
  );

  return {
    toasts,
    addToast,
    removeToast,
  };
};
