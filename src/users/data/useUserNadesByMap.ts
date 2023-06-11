import useSWR from "swr";
import { CsgoMap } from "../../map/models/CsGoMap";
import { NadeApi } from "../../nade/data/NadeApi";
import { sortByDate } from "../../utils/Common";
import { GameMode } from "../../nade/models/GameMode";

async function fetcher(userId: string, csMap: CsgoMap, gameMode: GameMode) {
  try {
    const result = await NadeApi.byUser(userId, gameMode, csMap);

    if (result.isOk()) {
      return result.value;
    } else {
      throw Error();
    }
  } catch (error) {
    throw error;
  }
}

export const useUserNadesByMap = (
  userId: string,
  csMap: CsgoMap,
  gameMode: GameMode
) => {
  const { data, error, isValidating } = useSWR(
    [userId, csMap, gameMode],
    fetcher
  );

  const nades = data
    ? data.sort((a, b) => sortByDate(a.createdAt, b.createdAt))
    : [];

  return {
    nades,
    isLoading: !data && isValidating && !error,
  };
};
