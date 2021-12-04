import { NadeApi } from "../../../nade/data/NadeApi";
import useSWR from "swr";

async function fetchPendingNades() {
  return await NadeApi.getPending();
}

export const useAdminPendingNades = () => {
  const { data } = useSWR(["/nades/pending"], fetchPendingNades);
  const pendingNades = data || [];

  return {
    pendingNades,
  };
};
