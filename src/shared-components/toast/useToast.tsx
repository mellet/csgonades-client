import { useContext } from "react";
import { ToastContext } from "./ToastContext";

export const useToast = () => {
  const toastContext = useContext(ToastContext);

  if (!toastContext) {
    throw Error("Trying to consume ToastContext without provider.");
  }

  return toastContext;
};
