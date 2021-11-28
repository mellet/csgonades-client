import { useCallback } from "react";
import { useLocalStorage } from "usehooks-ts";

type ApiStatus = "init" | "online" | "offline";

export const useApiStatus = () => {
  const [apiStatus, setApiStatus] = useLocalStorage<ApiStatus>(
    "apiStatus",
    "init"
  );

  const setApiOnline = useCallback(() => {
    setApiStatus("online");
  }, [setApiStatus]);

  const setApiOffline = useCallback(() => {
    setApiStatus("offline");
  }, [setApiStatus]);

  return {
    apiStatus,
    setApiOnline,
    setApiOffline,
  };
};
