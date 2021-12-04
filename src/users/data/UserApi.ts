import { ok } from "neverthrow";
import { Config } from "../../constants/Constants";
import { User, UserUpdateDTO } from "../models/User";
import { AppResult, extractApiError } from "../../utils/ErrorUtil";
import AxiosApi from "../../core/AxiosInstance";

export class UserApi {
  static fetchSelf = async (): Promise<User> => {
    const res = await AxiosApi.get(`${Config.API_URL}/users/self`);
    const user = res.data as User;
    return user;
  };

  static fetchUser = async (steamId: string): AppResult<User> => {
    try {
      const res = await AxiosApi.get(`${Config.API_URL}/users/${steamId}`);
      const user = res.data as User;
      return ok(user);
    } catch (error) {
      return extractApiError(error);
    }
  };

  static fetchUsers = async (
    page: number,
    limit: number,
    sortByActivity: boolean
  ): Promise<User[]> => {
    const res = await AxiosApi.get<User[]>(
      `${Config.API_URL}/users?page=${page}&limit=${limit}&sortActive=${sortByActivity}`
    );
    return res.data;
  };

  static updateUser = async (
    steamId: string,
    updatedUser: UserUpdateDTO
  ): AppResult<User> => {
    try {
      const res = await AxiosApi.patch(
        `${Config.API_URL}/users/${steamId}`,
        updatedUser
      );

      const user = res.data as User;
      return ok(user);
    } catch (error) {
      return extractApiError(error);
    }
  };
}
