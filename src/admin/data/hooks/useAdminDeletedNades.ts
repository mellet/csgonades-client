import useSWR from "swr";
import { useGetOrUpdateToken } from "../../../core/authentication/useGetToken";
import { NadeApi } from "../../../nade/data/NadeApi";

const useDeletedNadesFetcher = () => {
  const fetchToken = useGetOrUpdateToken();

  return async () => {
    const token = await fetchToken();

    if (!token) {
      return;
    }

    console.log("#Fetching notification", new Date());
    const result = await NadeApi.getDeleted(token);

    return result;
  };
};

export const useAdminDeletedNades = () => {
  const deletedNadesFetcher = useDeletedNadesFetcher();

  const { data, isValidating } = useSWR("/nades/deleted", deletedNadesFetcher);

  return {
    deletedNades: data || [],
    loading: !data && isValidating,
  };
};
