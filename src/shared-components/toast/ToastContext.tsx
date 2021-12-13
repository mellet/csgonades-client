import { AppToast } from "../../core/toasts/ToastModels";
import React, { createContext, FC, useMemo, useState } from "react";

export interface ToastContext {
  toasts: AppToast[];
  addToast: (toast: AppToast) => void;
  removeToast: (toastId: string) => void;
}

export const ToastContext = createContext<ToastContext | null>(null);

export const ToastProvider: FC = ({ children }) => {
  const [toasts, setToasts] = useState<AppToast[]>([]);

  const toastState = useMemo<ToastContext>(() => {
    return {
      toasts: toasts,
      addToast: (toast) => {
        setToasts((prevToasts) => [...prevToasts, toast]);
      },
      removeToast: (toastId) => {
        setToasts((prevToasts) =>
          prevToasts.filter((toast) => toast.id !== toastId)
        );
      },
    };
  }, [toasts]);

  return (
    <ToastContext.Provider value={toastState}>{children}</ToastContext.Provider>
  );
};
