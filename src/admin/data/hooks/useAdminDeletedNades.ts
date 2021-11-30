import useSWR from "swr";
import { useAuthToken } from "../../../core/authentication/useSession";
import { NadeApi } from "../../../nade/data/NadeApi";

async function fetchDeletedNades(_key: string, token?: string) {
  if (!token) {
    return [];
  }
  const result = await NadeApi.getDeleted(token);

  return result;
}

export const useAdminDeletedNades = () => {
  const authToken = useAuthToken();

  const { data, isValidating, error } = useSWR(
    ["/nades/deleted", authToken],
    fetchDeletedNades,
    { errorRetryCount: 1 }
  );

  return {
    deletedNades: data || [],
    loading: !data && isValidating,
    error,
  };
};
