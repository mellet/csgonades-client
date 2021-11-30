import axios from "axios";
import { ok } from "neverthrow";
import { Config } from "../../constants/Constants";
import { User, UserUpdateDTO } from "../models/User";
import { AppResult, extractApiError } from "../../utils/ErrorUtil";

export class UserApi {
  static fetchSelf = async (token: string): Promise<User> => {
    const res = await axios.get(`${Config.API_URL}/users/self`, {
      headers: { Authorization: token },
    });
    const user = res.data as User;
    return user;
  };

  static fetchUser = async (
    steamId: string,
    token?: string
  ): AppResult<User> => {
    try {
      let config = {};

      if (token) {
        config = { headers: { Authorization: token } };
      }

      const res = await axios.get(`${Config.API_URL}/users/${steamId}`, config);
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
        `${Config.API_URL}/users?page=${page}&limit=${limit}&sortActive=${sortByActivity}`,
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
        `${Config.API_URL}/users/${steamId}`,
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
