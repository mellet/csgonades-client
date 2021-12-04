import { UserApi } from "../../../users/data/UserApi";
import useSWR from "swr";

async function fetchUsers(
  _url: string,
  page: number,
  limit: number,
  sortByActivity: boolean
) {
  const result = await UserApi.fetchUsers(page, limit, sortByActivity);
  return result;
}

export const useAdminUsers = (
  page: number,
  limit: number,
  sortByActivity: boolean
) => {
  const { data } = useSWR(["/users", page, limit, sortByActivity], fetchUsers);

  return {
    users: data || [],
  };
};
