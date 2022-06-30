import { NadeApi } from "../../../nade/data/NadeApi";
import useSWR from "swr";

async function fetchPendingNades() {
  return await NadeApi.getPending();
}

export const useAdminPendingNades = () => {
  const { data } = useSWR(["/nades/pending"], fetchPendingNades, {
    dedupingInterval: 3 * 60 * 1000,
  });
  const pendingNades = data || [];

  return {
    pendingNades,
  };
};
