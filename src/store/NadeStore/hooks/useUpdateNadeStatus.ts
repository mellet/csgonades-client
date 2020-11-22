import { useCallback } from "react";
import { NadeApi } from "../../../nade-data/NadeApi";
import { NadeStatusDTO } from "../../../nade-data/Nade/Nade";
import { useReplaceNade } from "../../../store2/NadePageStore/hooks/useReplaceNade";
import { useGetOrUpdateToken } from "../../AuthStore/hooks/useGetToken";
import { useDisplayToast } from "../../ToastStore/hooks/useDisplayToast";

export const useUpdateNadeStatus = () => {
  const replaceNade = useReplaceNade();
  const getToken = useGetOrUpdateToken();
  const displayToast = useDisplayToast();

  const updateNadeStatus = useCallback(
    async (nadeId: string, updates: NadeStatusDTO) => {
      const authToken = await getToken();
      if (!authToken) {
        displayToast({
          message: "Can't update, seems like your not signed in.",
          severity: "error",
        });
        return;
      }

      const result = await NadeApi.updateNadeStatus(nadeId, updates, authToken);

      if (result.isErr()) {
        displayToast({
          message: "Failed to update nade.",
          severity: "error",
        });
        return;
      }

      replaceNade(result.value);
    },
    [getToken, displayToast, replaceNade]
  );

  return updateNadeStatus;
};
