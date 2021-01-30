import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { apiStatusSelector } from "../GlobalSelectors";
import { setApiOnlineAction, setApiOfflineAction } from "../GlobalStore";

export const useApiStatus = () => {
  const dispatch = useDispatch();
  const apiStatus = useSelector(apiStatusSelector);

  const setApiOnline = useCallback(() => {
    dispatch(setApiOnlineAction());
  }, [dispatch]);

  const setApiOffline = useCallback(() => {
    dispatch(setApiOfflineAction());
  }, [dispatch]);

  return {
    apiStatus,
    setApiOnline,
    setApiOffline,
  };
};
