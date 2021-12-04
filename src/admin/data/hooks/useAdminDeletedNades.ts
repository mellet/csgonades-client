import useSWR from "swr";
import { NadeApi } from "../../../nade/data/NadeApi";

async function fetchDeletedNades() {
  const result = await NadeApi.getDeleted();
  return result;
}

export const useAdminDeletedNades = () => {
  const { data, isValidating, error } = useSWR(
    "/nades/deleted",
    fetchDeletedNades,
    { errorRetryCount: 1 }
  );

  return {
    deletedNades: data || [],
    loading: !data && isValidating,
    error,
  };
};
