import { useCallback } from "react";
import { NadeApi } from "../../../nade-data/NadeApi";
import { NadeUpdateBody } from "../../../nade-data/Nade/Nade";
import { useReplaceNade } from "../../../store2/NadePageStore/hooks/useReplaceNade";
import { useGetOrUpdateToken } from "../../AuthStore/hooks/useGetToken";
import { useDisplayToast } from "../../ToastStore/hooks/useDisplayToast";

export const useUpdateNade = () => {
  const replaceNade = useReplaceNade();
  const getToken = useGetOrUpdateToken();
  const displayToast = useDisplayToast();

  const updateNade = useCallback(
    async (nadeId: string, data: NadeUpdateBody) => {
      const authToken = await getToken();

      if (!authToken) {
        console.error("Missing token");
        return;
      }

      const result = await NadeApi.update(nadeId, data, authToken);

      if (result.isErr()) {
        displayToast({
          message: "Failed to update nade.",
          severity: "error",
        });
        return;
      }

      replaceNade(result.value);

      displayToast({
        message: "Updated nade details!",
        severity: "success",
      });
    },
    [getToken, replaceNade, displayToast]
  );

  return updateNade;
};
