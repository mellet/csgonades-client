import axios from "axios";
import { ok } from "neverthrow";
import { User, UserUpdateDTO } from "../models/User";
import { AppResult, extractApiError } from "../../utils/ErrorUtil";
import getConfig from "next/config";

const config = getConfig()?.publicRuntimeConfig;

export class UserApi {
  static fetchSelf = async (token: string): AppResult<User> => {
    try {
      const res = await axios.get(`${config.apiUrl}/users/self`, {
        headers: { Authorization: token },
      });
      const user = res.data as User;
      return ok(user);
    } catch (error) {
      return extractApiError(error);
    }
  };

  static fetchUser = async (
    steamId: string,
    token?: string
  ): AppResult<User> => {
    try {
      let requestConfig = {};

      if (token) {
        requestConfig = { headers: { Authorization: token } };
      }

      const res = await axios.get(`${config.apiUrl}/users/${steamId}`, requestConfig);
      const user = res.data as User;
      return ok(user);
    } catch (error) {
      return extractApiError(error);
    }
  };

  static fetchUsers = async (
    page: number,
    limit: number,
    sortByActivity: boolean,
    token: string
  ): AppResult<User[]> => {
    try {
      const res = await axios.get(
        `${config.apiUrl}/users?page=${page}&limit=${limit}&sortActive=${sortByActivity}`,
        {
          headers: { Authorization: token },
        }
      );
      const users = res.data as User[];
      return ok(users);
    } catch (error) {
      return extractApiError(error);
    }
  };

  static updateUser = async (
    steamId: string,
    updatedUser: UserUpdateDTO,
    token: string
  ): AppResult<User> => {
    try {
      const res = await axios.patch(
        `${config.apiUrl}/users/${steamId}`,
        updatedUser,
        {
          headers: { Authorization: token },
        }
      );

      const user = res.data as User;
      return ok(user);
    } catch (error) {
      return extractApiError(error);
    }
  };
}
