import useSWR from "swr";
import { CsgoMap } from "../../map/models/CsGoMap";
import { NadeApi } from "../../nade/data/NadeApi";

async function fetcher(userId: string, map: CsgoMap) {
  try {
    const result = await NadeApi.byUser(userId, map);

    if (result.isOk()) {
      return result.value;
    } else {
      throw Error();
    }
  } catch (error) {
    throw error;
  }
}

export const useUserNadesByMap = (userId: string, map: CsgoMap) => {
  const { data, error, isValidating } = useSWR([userId, map], fetcher);

  return {
    nades: data,
    isLoading: !data && isValidating && !error,
  };
};
