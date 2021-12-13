import { ok } from "neverthrow";
import { AppConfig } from "../../constants/Constants";
import { User, UserUpdateDTO } from "../models/User";
import { AppResult, extractApiError } from "../../utils/ErrorUtil";
import AxiosApi from "../../core/AxiosInstance";
import axios from "axios";

export class UserApi {
  public static fetchSelf = async (): Promise<User> => {
    const res = await AxiosApi.get(`${AppConfig.API_URL}/users/self`);
    const user = res.data as User;
    return user;
  };

  public static fetchUser = async (steamId: string): AppResult<User> => {
    try {
      const res = await axios.get(`${AppConfig.API_URL}/users/${steamId}`);
      const user = res.data as User;
      return ok(user);
    } catch (error) {
      return extractApiError(error);
    }
  };

  public static fetchUsers = async (
    page: number,
    limit: number,
    sortByActivity: boolean
  ): Promise<User[]> => {
    const res = await AxiosApi.get<User[]>(
      `${AppConfig.API_URL}/users?page=${page}&limit=${limit}&sortActive=${sortByActivity}`
    );
    return res.data;
  };

  public static updateUser = async (
    steamId: string,
    updatedUser: UserUpdateDTO
  ): AppResult<User> => {
    try {
      const res = await AxiosApi.patch(
        `${AppConfig.API_URL}/users/${steamId}`,
        updatedUser
      );

      const user = res.data as User;
      return ok(user);
    } catch (error) {
      return extractApiError(error);
    }
  };
}
