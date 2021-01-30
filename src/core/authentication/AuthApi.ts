import axios, { AxiosRequestConfig } from "axios";
import { ok } from "neverthrow";
import { Config } from "../../constants/Constants";
import { AppResult, extractApiError } from "../../utils/ErrorUtil";

type TokenRes = {
  accessToken: string;
};

type SessionResponse = {
  authenticated: boolean;
};

export class AuthApi {
  static async refreshToken(cookie?: string): AppResult<string> {
    try {
      let config: AxiosRequestConfig = {
        withCredentials: true,
      };

      if (cookie) {
        config = {
          ...config,
          headers: {
            cookie: cookie,
          },
        };
      }

      const res = await axios.get<TokenRes>(
        `${Config.API_URL}/auth/refresh`,
        config
      );

      return ok(res.data.accessToken);
    } catch (error) {
      return extractApiError(error);
    }
  }

  static async setSessionCookie(): Promise<SessionResponse> {
    const response = await axios.post<SessionResponse>(
      `${Config.API_URL}/initSession`,
      {},
      { withCredentials: true }
    );

    return response.data;
  }

  static async signOut(): Promise<void> {
    try {
      await axios.post(
        `${Config.API_URL}/auth/signout`,
        {},
        {
          withCredentials: true,
        }
      );
    } catch (error) {
      console.error(error);
    }
  }
}
