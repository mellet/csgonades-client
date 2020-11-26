import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { UserApi } from "../../../api/UserApi";
import { UserUpdateDTO } from "../../../models/User";
import { setUserAction } from "../../AuthStore/AuthSlice";
import { useGetOrUpdateToken } from "../../AuthStore/hooks/useGetToken";

export const useFinishProfile = () => {
  const getToken = useGetOrUpdateToken();
  const dispatch = useDispatch();
  const finishProfile = useCallback(
    async (steamId: string, updatedField: UserUpdateDTO) => {
      const token = await getToken();

      if (!token) {
        console.error("Missing token, cant update.");
        return;
      }

      const result = await UserApi.updateUser(steamId, updatedField, token);

      if (result.isErr()) {
        return;
      }

      dispatch(setUserAction(result.value));
    },
    [dispatch, getToken]
  );
  return finishProfile;
};
