import { useCallback } from "react";
import { useSelector } from "react-redux";
import { NadeApi } from "../../../nade-data/NadeApi";
import { userSelector } from "../../AuthStore/AuthSelectors";

export const useRegisterView = () => {
  const user = useSelector(userSelector);

  const registerNadeView = useCallback(
    (nadeId: string) => {
      if (user?.role === "administrator") {
        return;
      }
      NadeApi.registerView(nadeId);
    },
    [user]
  );

  return registerNadeView;
};
