import Router from "next/router";
import { useCallback } from "react";
import { NadeApi } from "../../../nade-data/NadeApi";
import { useGetOrUpdateToken } from "../../AuthStore/hooks/useGetToken";
import { useDisplayToast } from "../../ToastStore/hooks/useDisplayToast";

export const useDeleteNade = () => {
  const getToken = useGetOrUpdateToken();
  const displayToast = useDisplayToast();

  const deleteNade = useCallback(
    async (nadeId: string) => {
      const authToken = await getToken();

      if (!authToken) {
        displayToast({
          message: "Can't update, seems like your not signed in.",
          severity: "error",
        });
        return;
      }

      const result = await NadeApi.delete(nadeId, authToken);

      if (result.isErr()) {
        displayToast({
          message: "Failed to delete nade.",
          severity: "error",
        });
        return;
      }

      Router.push("/", "/");
    },
    [getToken, displayToast]
  );

  return deleteNade;
};
