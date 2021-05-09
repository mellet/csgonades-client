import useSWR from "swr";
import { CsgoMap } from "../../map/models/CsGoMap";
import { NadeApi } from "../../nade/data/NadeApi";
import { sortByDate } from "../../utils/Common";

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

  const nades = data
    ? data.sort((a, b) => sortByDate(a.createdAt, b.createdAt))
    : [];

  return {
    nades,
    isLoading: !data && isValidating && !error,
  };
};
